import { describe, expect, it, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { renderWithQueryClient, jsonResponse } from '../testUtils';
import Home from '../../src/app/(live)/page';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('Home page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('renders the Mahiwagahan theme, venue info, and donate CTA', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(jsonResponse([]))));

    renderWithQueryClient(<Home />);

    expect(screen.getByRole('heading', { name: 'Mahiwagahan' })).toBeInTheDocument();
    expect(screen.getByText('Discover FACT 2026')).toBeInTheDocument();
    expect(screen.getByText(/October 16–18/)).toBeInTheDocument();
    expect(await screen.findByText(/Enjoying FACT\?/i)).toBeInTheDocument();
  });

  it('explains how to join instead of "registration opens soon"', () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(jsonResponse([]))));

    renderWithQueryClient(<Home />);

    expect(screen.getByRole('heading', { name: 'How to join FACT 2026' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create your My FACT account/ })).toHaveAttribute('href', '/my-fact/create-account');
    expect(screen.getByRole('link', { name: /Variety Show page/ })).toHaveAttribute('href', '/variety-show');
    expect(screen.queryByText(/Registration opens soon/)).not.toBeInTheDocument();
    expect(screen.queryByText(/More information coming soon/)).not.toBeInTheDocument();
    expect(screen.queryByText(/UIUC students/)).not.toBeInTheDocument();
  });
});
