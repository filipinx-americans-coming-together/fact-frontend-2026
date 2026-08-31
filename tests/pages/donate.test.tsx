import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import DonatePage from '../../src/app/(live)/donate/page';

vi.mock('next/navigation', () => ({ usePathname: () => '/donate' }));

describe('Donate page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the Blackbaud form mount point and does not self-promote the donate CTA', () => {
    render(<DonatePage />);

    expect(document.getElementById('bbox-root')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Donate' })).toBeInTheDocument();
    expect(screen.queryByText(/Enjoying what FACT is building/i)).not.toBeInTheDocument();
  });
});
