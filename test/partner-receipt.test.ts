// @vitest-environment node
// Exercises private receipt persistence, ambiguous-write retries, inbox delivery and authenticated retries.
import { beforeEach, afterEach, expect, it, vi } from 'vitest';
const m = vi.hoisted(() => ({ put: vi.fn(), get: vi.fn(), del: vi.fn(), list: vi.fn(), transport: vi.fn(), send: vi.fn(), tasks: [] as Array<() => Promise<void>> }));
vi.mock('@vercel/blob', () => ({ put: m.put, get: m.get, del: m.del, list: m.list }));
vi.mock('nodemailer', () => ({ createTransport: m.transport }));
vi.mock('next/server', () => ({ after: (task: () => Promise<void>) => m.tasks.push(task) }));
import { parsePartnerSubmission } from '../src/app/lib/partnerSubmission';
import { savePartnerReceipt, notifyPartnerReceipt, retryPartnerNotifications } from '../src/app/lib/partnerReceipt';
import { POST } from '../src/app/api/partner-inquiries/route';
import { GET } from '../src/app/api/partner-inquiries/retry/route';
const id = '12345678-1234-4234-8234-123456789abc';
const fixture = { id, tier: 'partner' as const, name: 'Fixture', email: 'fixture@example.test', org: 'Fixture Team', message: 'Please contact us.' };
let blobs: Map<string, string>;
beforeEach(() => {
  blobs = new Map(); m.tasks.length = 0;
  vi.stubEnv('BLOB_STORE_ID', 'store_fixture');
  vi.stubEnv('BLOB_READ_WRITE_TOKEN', '');
  vi.stubEnv('PARTNER_SMTP_HOST', 'smtp.example.test');
  vi.stubEnv('PARTNER_SMTP_USER', 'sender@example.test');
  vi.stubEnv('PARTNER_SMTP_PASSWORD', 'fixture-secret');
  vi.stubEnv('PARTNER_SMTP_PORT', '');
  vi.stubEnv('CRON_SECRET', 'fixture-cron');
  m.put.mockImplementation(async (path: string, body: string) => {
    if (blobs.has(path)) throw Error('Existing blob');
    blobs.set(path, body);
  });
  m.get.mockImplementation(async (path: string) => blobs.has(path) ? { statusCode: 200, stream: new Response(blobs.get(path)).body } : null);
  m.del.mockImplementation(async (path: string) => { blobs.delete(path); });
  m.list.mockImplementation(async () => ({ blobs: [...blobs.keys()].filter(pathname => pathname.includes('/pending/')).map(pathname => ({ pathname })) }));
  m.transport.mockReturnValue({ sendMail: m.send });
  m.send.mockResolvedValue({ accepted: ['jake@buddyllc.app'] });
});
afterEach(() => vi.unstubAllEnvs());
function request(body: unknown = fixture, headers: Record<string, string> = {}) {
  return new Request('https://buddysports.app/api/partner-inquiries', { method: 'POST', headers: { origin: 'https://buddysports.app', 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
it('validates bounded trimmed contact fields and each supported tier', () => {
  for (const tier of ['api','custom','partner']) expect(parsePartnerSubmission({ ...fixture, tier, name: ' Fixture ', org: ' ' })).toEqual({ ...fixture, tier, org: '' });
  for (const bad of [null, 'text', {}, { ...fixture, id: 'not-uuid' }, { ...fixture, tier: 'other' }, { ...fixture, name: 42 }, { ...fixture, name: ' ' }, { ...fixture, name: 'a'.repeat(121) }, { ...fixture, org: 'a'.repeat(201) }, { ...fixture, message: '' }, { ...fixture, message: 'a'.repeat(4001) }, { ...fixture, email: 'invalid' }, { ...fixture, email: 'a'.repeat(255)+'@example.test' }, { ...fixture, email: 'a@example.test\r\nbcc:x@y.test' }]) expect(parsePartnerSubmission(bad)).toBeNull();
});
it('persists a private immutable receipt and retryable notification before confirming', async () => {
  const result = await POST(request());
  expect(result.status).toBe(201);
  expect(await result.json()).toEqual({ received: true, reference: id });
  expect(result.headers.get('cache-control')).toBe('no-store');
  expect(blobs.size).toBe(2);
  expect(m.put.mock.calls.every(call => call[2].access === 'private')).toBe(true);
  expect(m.send).not.toHaveBeenCalled();
  await m.tasks[0]();
  expect(m.send).toHaveBeenCalledWith(expect.objectContaining({ to: 'jake@buddyllc.app', replyTo: fixture.email, subject: expect.stringContaining(id), text: expect.stringContaining(fixture.message) }));
  expect([...blobs.keys()].some(path => path.includes('/pending/'))).toBe(false);
  expect([...blobs.keys()].some(path => path.includes('/notified/'))).toBe(true);
});
it('reuses receipts after duplicate or ambiguous writes and refuses payload substitution', async () => {
  await savePartnerReceipt(fixture);
  await savePartnerReceipt(fixture);
  expect(blobs.size).toBe(2);
  await expect(savePartnerReceipt({ ...fixture, message: 'Changed' })).rejects.toThrow();
  expect(JSON.parse(blobs.get(`partner-inquiries/receipts/${id}.json`)!)).toMatchObject(fixture);
});
it('fails closed when either receipt or outbox persistence fails', async () => {
  m.put.mockRejectedValueOnce(Error('Storage unavailable'));
  expect((await POST(request())).status).toBe(503);
  expect(m.tasks).toHaveLength(0);
  m.put.mockImplementationOnce(async (path: string, body: string) => { blobs.set(path, body); }).mockRejectedValueOnce(Error('Outbox unavailable'));
  expect((await POST(request())).status).toBe(503);
  expect(m.tasks).toHaveLength(0);
});
it('keeps durable receipts pending through missing mail configuration and mail failures', async () => {
  await savePartnerReceipt(fixture);
  vi.stubEnv('PARTNER_SMTP_HOST', '');
  expect(await notifyPartnerReceipt(id)).toBe(false);
  expect(m.send).not.toHaveBeenCalled();
  vi.stubEnv('PARTNER_SMTP_HOST', 'smtp.example.test');
  m.send.mockRejectedValueOnce(Error('SMTP unavailable'));
  expect(await retryPartnerNotifications()).toEqual({ attempted: 1, notified: 0 });
  expect(blobs.has(`partner-inquiries/pending/${id}.json`)).toBe(true);
  expect(await retryPartnerNotifications()).toEqual({ attempted: 1, notified: 1 });
  expect(await notifyPartnerReceipt(id)).toBe(true);
  expect(m.send).toHaveBeenCalledTimes(2);
});
it('requires accepted delivery, retains the outbox on rejection and supports implicit TLS', async () => {
  await savePartnerReceipt(fixture);
  vi.stubEnv('PARTNER_SMTP_PORT', '465');
  m.send.mockResolvedValueOnce({ accepted: [] });
  await expect(notifyPartnerReceipt(id)).rejects.toThrow('Notification not accepted');
  expect(m.transport).toHaveBeenCalledWith(expect.objectContaining({ port: 465, secure: true, requireTLS: false }));
  expect(blobs.has(`partner-inquiries/pending/${id}.json`)).toBe(true);
  expect(await notifyPartnerReceipt('missing')).toBe(false);
});
it.each(['PARTNER_SMTP_USER','PARTNER_SMTP_PASSWORD'])('leaves the receipt pending without %s', async key => {
  await savePartnerReceipt(fixture); vi.stubEnv(key, '');
  expect(await retryPartnerNotifications()).toEqual({ attempted: 1, notified: 0 });
});
it('rejects cross-origin, non-JSON, malformed, oversized and unconfigured requests', async () => {
  expect((await POST(request(fixture, { origin: 'https://other.test' }))).status).toBe(403);
  expect((await POST(request(fixture, { 'content-type': 'text/plain' }))).status).toBe(415);
  expect((await POST(request({ ...fixture, message: 'x'.repeat(17000) }))).status).toBe(413);
  expect((await POST(request({}))).status).toBe(400);
  const malformed = new Request('https://buddysports.app/api/partner-inquiries', { method: 'POST', headers: { origin: 'https://buddysports.app', 'content-type': 'application/json' }, body: '{' });
  expect((await POST(malformed)).status).toBe(400);
  const empty = new Request('https://buddysports.app/api/partner-inquiries', { method: 'POST', headers: { origin: 'https://buddysports.app', 'content-type': 'application/json' } });
  expect((await POST(empty)).status).toBe(400);
  vi.stubEnv('BLOB_STORE_ID', '');
  expect((await POST(request())).status).toBe(503);
  expect(m.put).not.toHaveBeenCalled();
});
it('accepts token-based storage configuration and logs only receipt references on deferred delivery', async () => {
  vi.stubEnv('BLOB_STORE_ID', '');vi.stubEnv('BLOB_READ_WRITE_TOKEN', 'fixture');
  vi.stubEnv('PARTNER_SMTP_HOST', '');
  expect((await POST(request())).status).toBe(201); await m.tasks[0]();
  vi.stubEnv('PARTNER_SMTP_HOST', 'smtp.example.test');m.send.mockRejectedValueOnce(Error('Mail failure'));
  expect((await POST(request())).status).toBe(201); await m.tasks[1]();
});
it('requires a configured, exact byte-matching cron secret before reading private outbox records', async () => {
  const req = (authorization?: string) => new Request('https://buddysports.app/api/partner-inquiries/retry', { headers: authorization ? { authorization } : {} });
  expect((await GET(req())).status).toBe(401);
  expect((await GET(req('Bearer wrong'))).status).toBe(401);
  expect((await GET(req('Bearer fixture-croñ'))).status).toBe(401);
  expect(m.list).not.toHaveBeenCalled();
  const success = await GET(req('Bearer fixture-cron'));
  expect(success.status).toBe(200);expect(await success.json()).toEqual({ attempted: 0, notified: 0 });
  vi.stubEnv('CRON_SECRET', '');expect((await GET(req('Bearer fixture-cron'))).status).toBe(401);
});
