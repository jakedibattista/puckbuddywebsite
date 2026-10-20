// Checks required partner fields and email draft encoding without sending an inquiry.
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../src/app/components/ContactForm';
import { buildPartnerInquiry } from '../src/app/lib/partnerInquiry';
import { track } from '@vercel/analytics';
import * as inquiry from '../src/app/lib/partnerInquiry';
vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
import { CONTACT_EMAIL } from '../src/app/lib/constants';
afterEach(() => { cleanup(); window.history.replaceState(null, '', '/'); });
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

it('opens the draft even if analytics fails, without sending contact details to telemetry', () => {
  const build = vi.spyOn(inquiry, 'buildPartnerInquiry').mockReturnValue('#draft-fixture');
  vi.mocked(track).mockImplementationOnce(() => { throw new Error('Telemetry unavailable'); });
  const { container } = render(<ContactForm tier="partner" setTier={() => {}} />);
  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Fixture Name' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'fixture@example.test' } });
  fireEvent.change(screen.getByLabelText(/Tell us more/), { target: { value: 'Fixture inquiry' } });
  expect(container.querySelector('form')?.checkValidity()).toBe(true);
  fireEvent.submit(container.querySelector('form')!);
  expect(build).toHaveBeenCalledExactlyOnceWith({ tier: 'partner', name: 'Fixture Name', email: 'fixture@example.test', org: '', message: 'Fixture inquiry' });
  expect(screen.getByText('Your email client should open!')).toBeTruthy();
  expect(track).toHaveBeenCalledExactlyOnceWith('partner_lead_submit', { tier: 'partner', delivery: 'email_draft' });
  expect(window.location.hash).toBe('#draft-fixture');
});
