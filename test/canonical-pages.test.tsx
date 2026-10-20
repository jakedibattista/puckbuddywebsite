// Checks that public pages name their own canonical route and preserve the shared site shell.
import React from 'react';
import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
vi.mock('../src/app/globals.css', () => ({}));
vi.mock('geist/font/sans', () => ({ GeistSans: { variable: 'sans', className: 'font' } }));
vi.mock('geist/font/mono', () => ({ GeistMono: { variable: 'mono' } }));
vi.mock('../src/app/components/Navigation', () => ({ default: () => <nav>Navigation</nav> }));
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
vi.mock('@vercel/speed-insights/next', () => ({ SpeedInsights: () => null }));
it('uses the primary origin and a home canonical in the shared document', async () => {
  const { default: Layout, metadata } = await import('../src/app/layout');
  expect(metadata.alternates?.canonical).toBe('/');
  expect(metadata.metadataBase?.href).toBe('https://buddysports.app/');
  const html = renderToStaticMarkup(<Layout><p>Content</p></Layout>);
  expect(html).toContain('Content'); expect(html).toContain('/support');
});
it.each(['delete-account','demo','privacy','refund','sms-terms','support','terms','v2-walkthrough'])('gives /%s its own canonical instead of inheriting home', async route => {
  const { default: Layout, metadata } = await import(`../src/app/${route}/layout.tsx`);
  expect(metadata.alternates.canonical).toBe('/'+route);
  expect(renderToStaticMarkup(<Layout><p>Content</p></Layout>)).toBe('<p>Content</p>');
});

it('keeps artwork utilities out of search results', async () => {
  const { default: Layout, metadata } = await import('../src/app/(marketing-exports)/layout');
  expect(metadata.robots).toEqual({ index: false, follow: false });
  expect(metadata.alternates?.canonical).toBeNull();
  expect(renderToStaticMarkup(<Layout><p>Artwork</p></Layout>)).toBe('<p>Artwork</p>');
});
