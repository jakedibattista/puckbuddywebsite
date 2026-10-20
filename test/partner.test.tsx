// Checks receipt confirmation, retry behavior and the retained manual email draft encoder.
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from '../src/app/components/ContactForm';
import { buildPartnerInquiry } from '../src/app/lib/partnerInquiry';
import { track } from '@vercel/analytics';
vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
import { CONTACT_EMAIL } from '../src/app/lib/constants';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });
it.each(['api','custom','partner'] as const)('encodes a %s inquiry without allowing query injection', tier => {
  const url = new URL(buildPartnerInquiry({ tier, name: 'A & B', email: 'a+b@example.test', org: 'Club #1', message: 'Hello\n&bcc=other@example.test' }));
  expect(url.protocol).toBe('mailto:'); expect(url.pathname).toBe(CONTACT_EMAIL);
  expect([...url.searchParams.keys()]).toEqual(['subject','body']);
  expect(url.searchParams.get('subject')).toContain('A & B');
  expect(url.searchParams.get('body')).toContain('Email: a+b@example.test');
  expect(url.searchParams.get('body')).toContain('Hello\n&bcc=other@example.test');
});
it('requires contact details and lets the user choose the partner program', () => {
  const change = vi.fn();
  const { container } = render(<ContactForm tier="api" setTier={change} />);
  fireEvent.click(screen.getByRole('button', { name: 'Partner Program' }));
  expect(change).toHaveBeenCalledWith('partner');
  expect(container.querySelector('form')?.checkValidity()).toBe(false);
  expect(container.querySelector('input[type=email]')?.hasAttribute('required')).toBe(true);
});

function fillForm() {
  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Fixture Name' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'fixture@example.test' } });
  fireEvent.change(screen.getByLabelText(/Organization/), { target: { value: 'Fixture Org' } });
  fireEvent.change(screen.getByLabelText(/Tell us more/), { target: { value: 'Fixture inquiry' } });
}
it('confirms only the server receipt and excludes contact details from analytics', async () => {
  vi.stubGlobal('fetch', vi.fn(async (_url: RequestInfo | URL, options: RequestInit) => {
    const payload = JSON.parse(options.body as string);
    return Response.json({ received: true, reference: payload.id }, { status: 201 });
  }));
  vi.mocked(track).mockImplementationOnce(() => { throw new Error('Telemetry unavailable'); });
  const { container } = render(<ContactForm tier="partner" setTier={() => {}} />);
  fillForm();
  fireEvent.submit(container.querySelector('form')!);
  await screen.findByText('Your inquiry has been received.');
  expect(track).toHaveBeenCalledExactlyOnceWith('partner_lead_received', { tier: 'partner', delivery: 'private_receipt' });
  expect(fetch).toHaveBeenCalledTimes(1);
  const [url, options] = vi.mocked(fetch).mock.calls[0];
  expect(url).toBe('/api/partner-inquiries');
  expect(options?.method).toBe('POST');
  expect(JSON.parse(options?.body as string)).toMatchObject({ tier: 'partner', name: 'Fixture Name', email: 'fixture@example.test', org: 'Fixture Org', message: 'Fixture inquiry' });
  fireEvent.click(screen.getByRole('button', { name: 'Send another inquiry' }));
  expect(screen.getByRole('button', { name: 'Send inquiry' })).toBeTruthy();
});
it.each(['network', 'server', 'wrong-reference', 'not-received'])('preserves details and retry identity after %s failure', async failure => {
  const send = vi.fn(async (_url: RequestInfo | URL, options: RequestInit) => {
    if (failure === 'network') throw Error('Offline');
    const payload = JSON.parse(options.body as string);
    return Response.json({ received: failure !== 'not-received', reference: failure === 'wrong-reference' ? 'wrong' : payload.id }, { status: failure === 'server' ? 503 : 201 });
  });
  vi.stubGlobal('fetch', send);
  const { container } = render(<ContactForm tier="api" setTier={() => {}} />);
  fillForm();
  fireEvent.submit(container.querySelector('form')!);
  await screen.findByRole('alert');
  expect(screen.getByLabelText(/Name/).getAttribute('value')).toBe('Fixture Name');
  expect(track).not.toHaveBeenCalled();
  const first = JSON.parse(send.mock.calls[0][1].body as string).id;
  fireEvent.submit(container.querySelector('form')!);
  await waitFor(() => expect(send).toHaveBeenCalledTimes(2));
  expect(JSON.parse(send.mock.calls[1][1].body as string).id).toBe(first);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Send inquiry' })).toBeTruthy());
  fireEvent.change(screen.getByLabelText(/Tell us more/), { target: { value: 'Edited inquiry' } });
  fireEvent.submit(container.querySelector('form')!);
  await waitFor(() => expect(send).toHaveBeenCalledTimes(3));
  expect(JSON.parse(send.mock.calls[2][1].body as string).id).not.toBe(first);
});
it('blocks duplicate submissions while confirmation is pending', async () => {
  let finish!: (response: Response) => void;
  const send = vi.fn(() => new Promise<Response>(resolve => { finish = resolve; }));
  vi.stubGlobal('fetch', send);
  const { container } = render(<ContactForm tier="custom" setTier={() => {}} />);
  fillForm();
  fireEvent.submit(container.querySelector('form')!);
  fireEvent.submit(container.querySelector('form')!);
  expect(send).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Sending…' }).hasAttribute('disabled')).toBe(true);
  finish(Response.json({ received: false }));
  await screen.findByRole('alert');
});
