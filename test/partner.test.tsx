// Checks required partner fields and email draft encoding without sending an inquiry.
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../src/app/components/ContactForm';
import { buildPartnerInquiry } from '../src/app/lib/partnerInquiry';
import { CONTACT_EMAIL } from '../src/app/lib/constants';
afterEach(cleanup);
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
