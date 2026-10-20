// Exercises real marketing-page composition and inquiry routing with external navigation and submission mocked.
// Page tests verify destinations and user actions; child motion/media visuals are simulated.
import { renderToStaticMarkup } from 'react-dom/server';
import React, { type ReactNode } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const io = vi.hoisted(() => ({ reduced: true, rating: '4.6', videoCount: '123+', motion: [] as Array<{ transition?: { duration?: number }; initial?: { opacity?: number } }>, socialElement: null as unknown, track: vi.fn(), scroll: vi.fn() }));
vi.mock('../src/app/lib/constants', async importOriginal => ({ ...await importOriginal<typeof import('../src/app/lib/constants')>(), APP_STORE_RATING: io.rating, ANALYZED_VIDEO_COUNT_LABEL: io.videoCount }));
vi.mock('@vercel/analytics', () => ({ track: io.track }));
vi.mock('next/og', () => ({ ImageResponse: class { constructor(element: unknown) { io.socialElement = element; } } }));
vi.mock('next/font/google', () => ({ Instrument_Serif: () => ({ className: 'serif' }) }));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
vi.mock('next/link', () => ({ default: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a> }));
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: Object.fromEntries(['div', 'h1', 'h2', 'p', 'span'].map(tag => [tag, ({ children, className, id, ...motionProps }: { children: ReactNode; className?: string; id?: string }) => { io.motion.push(motionProps); return React.createElement(tag, { className, id }, children); }])),
}));
vi.mock('../src/app/hooks/useReducedMotionPreference', () => ({ useReducedMotionPreference: () => io.reduced }));
import PartnerPage from '../src/app/partner/page';
import Home from '../src/app/page';
import About from '../src/app/about/page';
import PuckBuddyPage from '../src/app/puckbuddy/page';
import LacrossePage from '../src/app/lacrosse/page';
import { APP_STORE_URL, PLAY_STORE_URL } from '../src/app/hooks/useAppStoreUrl';
import { CALENDLY_URL, APP_STORE_RATING, ANALYZED_VIDEO_COUNT_LABEL } from '../src/app/lib/constants';
const blockNavigation = (event: Event) => { if ((event.target as Element).closest('a')) event.preventDefault(); };
beforeEach(() => {
  vi.useFakeTimers(); io.motion = []; io.reduced = true; io.track.mockReset(); io.scroll.mockReset();
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: io.scroll });
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(); vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {}); vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('desktop fixture');
  document.addEventListener('click', blockNavigation, true);
  vi.stubGlobal('fetch', vi.fn(async () => { throw Error('Unexpected external request'); }));
});
afterEach(() => { cleanup(); Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView'); vi.useRealTimers(); vi.unstubAllGlobals(); document.removeEventListener('click', blockNavigation, true); });
it('describes supported async status polling instead of promising planned completion webhooks', () => {
  render(<PartnerPage />);
  expect(screen.queryByText('Webhooks for async result delivery')).toBeNull();
  expect(screen.getByText('Async job status and structured results')).toBeTruthy();
  expect(screen.getByText(`${ANALYZED_VIDEO_COUNT_LABEL} videos`)).toBeTruthy();
});
it('honors reduced motion when an inquiry CTA scrolls to the selected form', () => {
  render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Request a promo code' }));
  act(() => vi.advanceTimersByTime(50)); expect(io.scroll).toHaveBeenCalledExactlyOnceWith({ behavior: 'auto', block: 'start' });
});
it('keeps only the latest pending inquiry scroll', () => {
  render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Get API access' }));
  fireEvent.click(screen.getByRole('button', { name: 'Request a promo code' }));
  expect(vi.getTimerCount()).toBe(1); act(() => vi.advanceTimersByTime(50)); expect(io.scroll).toHaveBeenCalledOnce();
});
it('cancels inquiry scrolling when the page unmounts', () => {
  const view = render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Get API access' }));
  expect(vi.getTimerCount()).toBe(1); view.unmount(); expect(vi.getTimerCount()).toBe(0);
});
it.each([['Get API access', 'api'], ['Request API access', 'api'], ['Get your promo code', 'partner'], ['Request a promo code', 'partner']])('submits the intended inquiry tier from %s', async (button, tier) => {
  vi.stubGlobal('fetch', vi.fn(async (_url: unknown, options: { body: string }) => {
    const body = JSON.parse(options.body); return { ok: true, json: async () => ({ received: true, reference: body.id }) };
  }));
  render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: button }));
  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Page Fixture' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'fixture@example.test' } });
  fireEvent.change(screen.getByLabelText(/Tell us more/), { target: { value: 'Controlled page composition check' } });
  await act(async () => fireEvent.submit(screen.getByRole('button', { name: 'Send inquiry' }).closest('form')!));
  expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string)).toMatchObject({ tier, name: 'Page Fixture' });
  expect(screen.getByText('Your inquiry has been received.')).toBeTruthy();
});
it.each([['Book a 30-min call', 'partner_hero'], ['Book a discovery call', 'custom_dev_card'], ['Book a 30-minute call', 'contact_section']])('keeps the scheduling link and bounded tracking for %s', (name, location) => {
  render(<PartnerPage />); const link = screen.getByRole('link', { name });
  expect(link.getAttribute('href')).toBe(CALENDLY_URL); expect(link.getAttribute('rel')).toBe('noopener noreferrer'); fireEvent.click(link);
  expect(io.track).toHaveBeenCalledWith('partner_cta_click', { cta: 'calendly', location }); expect(fetch).not.toHaveBeenCalled();
});
it('retains smooth scrolling when motion is allowed', () => {
  io.reduced = false; render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Get API access' }));
  act(() => vi.advanceTimersByTime(50)); expect(io.scroll).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
});
it.each([true, false])('keeps homepage download and partner destinations with reduced motion %s', reduced => {
  io.reduced = reduced; render(<Home />);
  expect(screen.getAllByRole('link', { name: 'Download on the App Store' }).every(link => link.getAttribute('href') === APP_STORE_URL)).toBe(true);
  expect(screen.getAllByRole('link', { name: 'Get it on Google Play' }).every(link => link.getAttribute('href') === PLAY_STORE_URL)).toBe(true);
  expect(screen.getByRole('link', { name: /Explore Puck Buddy/ }).getAttribute('href')).toBe('/puckbuddy');
  expect(screen.getAllByText(`${APP_STORE_RATING}★`).length).toBeGreaterThan(0);
  expect(screen.getByText(ANALYZED_VIDEO_COUNT_LABEL)).toBeTruthy();
});
it.each([['desktop fixture', true], ['Android', true], ['iPhone', true], ['desktop fixture', false], ['Android', false], ['iPhone', false]] as const)('routes product pricing and about downloads for %s with reduced motion %s', (userAgent, reduced) => {
  io.reduced = reduced;
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent);
  const expected = userAgent === 'Android' ? PLAY_STORE_URL : userAgent === 'iPhone' ? APP_STORE_URL : '/puckbuddy';
  const view = render(<PuckBuddyPage />); expect(screen.getByText(ANALYZED_VIDEO_COUNT_LABEL)).toBeTruthy();
  const pricing = view.container.querySelector('#pricing')!;
  const annual = within(pricing as HTMLElement).getByRole('link', { name: /Annual subscription/ });
  expect(annual.getAttribute('href')).toBe(expected); expect(within(annual).getByText('$79.99')).toBeTruthy();
  expect(within(pricing as HTMLElement).getByText('$8.99')).toBeTruthy();
  expect(within(pricing as HTMLElement).getByRole('link', { name: /team/ }).getAttribute('href')).toBe('/partner#contact');
  view.unmount(); render(<About />);
  const downloads = screen.getAllByRole('link').filter(link => /download|app store|google play/i.test(link.getAttribute('aria-label') ?? link.textContent ?? ''));
  expect(downloads.length).toBeGreaterThan(0); expect(downloads.every(link => link.getAttribute('href') === expected)).toBe(true);
});
it.each([true, false])('preserves lacrosse beta destinations and the mobile CTA with reduced motion %s', reduced => {
  io.reduced = reduced; render(<LacrossePage />);
  const links = screen.getAllByRole('link', { name: /Try Lax Buddy|Try Scout/ });
  expect(links.length).toBeGreaterThanOrEqual(4);
  for (const link of links) { expect(link.getAttribute('target')).toBe('_blank'); expect(link.getAttribute('rel')).toBe('noopener noreferrer'); }
  expect(screen.getAllByText('Beta')).toHaveLength(2);
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 700 }); fireEvent.scroll(window);
  const laxLinks = screen.getAllByRole('link', { name: /Try Lax Buddy/ });
  expect(laxLinks.every(link => link.getAttribute('href') === 'https://lax-buddy-358616086489.us-east1.run.app/')).toBe(true);
  const stickyLink = document.querySelector('.fixed a') as HTMLAnchorElement; fireEvent.click(stickyLink);
  expect(io.track).toHaveBeenCalledWith('navigation_cta_click', { target: 'new_tab', location: 'mobile_sticky_cta' });
  expect(io.track).not.toHaveBeenCalledWith('store_badge_click', expect.anything());
});

it.each([true, false])('applies the requested motion preference to the About hero and sections: %s', reduced => {
  io.reduced = reduced; render(<About />); expect(io.motion.length).toBeGreaterThan(0);
  for (const props of io.motion) {
    if (reduced) { expect(props.initial?.opacity).toBe(1); expect(props.transition?.duration).toBe(0); }
    else expect(props.transition?.duration).toBeGreaterThan(0);
  }
});
it('uses the shared rating in product search and social metadata', async () => {
  const { metadata, default: Layout } = await import('../src/app/puckbuddy/layout');
  render(<Layout><p>Product layout child</p></Layout>); expect(screen.getByText('Product layout child')).toBeTruthy();
  expect(metadata.description).toContain(`${APP_STORE_RATING}★`);
  expect(metadata.openGraph?.description).toBe(metadata.description); expect(metadata.twitter?.description).toBe(metadata.description);
});
it('uses the same configured rating in the rendered social-image payload', async () => {
  const { default: image } = await import('../src/app/opengraph-image'); await image();
  expect(renderToStaticMarkup(io.socialElement as React.ReactNode)).toContain(`Rated ${APP_STORE_RATING} on the App Store.`);
});

it('uses the latest motion preference for a pending inquiry scroll', () => {
  io.reduced = false; const view = render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Get API access' }));
  io.reduced = true; view.rerender(<PartnerPage />); act(() => vi.advanceTimersByTime(50));
  expect(io.scroll).toHaveBeenCalledExactlyOnceWith({ behavior: 'auto', block: 'start' });
});
it('keeps homepage scheduling usable and bounded when telemetry fails', () => {
  io.track.mockImplementation(() => { throw Error('telemetry unavailable'); }); render(<Home />);
  const link = screen.getByRole('link', { name: /Book.*call/i }); expect(link.getAttribute('href')).toBe(CALENDLY_URL);
  expect(() => fireEvent.click(link)).not.toThrow(); expect(io.track).toHaveBeenCalledWith('partner_cta_click', { cta: 'calendly', location: 'home_b2b' });
  const partner = screen.getByRole('link', { name: 'Explore partnerships' }); expect(partner.getAttribute('href')).toBe('/partner'); fireEvent.click(partner);
  expect(io.track).toHaveBeenCalledWith('partner_cta_click', { cta: 'partner_page', location: 'home_b2b' }); expect(fetch).not.toHaveBeenCalled();
});
it('exposes the selected inquiry type as an accessible pressed choice', () => {
  render(<PartnerPage />); fireEvent.click(screen.getByRole('button', { name: 'Request a promo code' }));
  const group = screen.getByRole('group', { name: /interested in/ });
  expect(within(group).getByRole('button', { name: 'Partner Program', pressed: true })).toBeTruthy();
  fireEvent.click(within(group).getByRole('button', { name: 'Custom Development' }));
  expect(within(group).getByRole('button', { name: 'Custom Development', pressed: true })).toBeTruthy();
  expect(within(group).getByRole('button', { name: 'Partner Program', pressed: false })).toBeTruthy();
});
