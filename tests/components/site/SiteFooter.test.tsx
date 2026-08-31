import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { SiteFooter } from '../../../src/components/site/SiteFooter';

const { mockUsePathname } = vi.hoisted(() => ({ mockUsePathname: vi.fn() }));
vi.mock('next/navigation', () => ({ usePathname: mockUsePathname }));

describe('SiteFooter', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('shows the donate prompt on ordinary pages', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<SiteFooter />);
    expect(screen.getByText(/Enjoying what FACT is building/i)).toBeInTheDocument();
  });

  it('hides the donate prompt on the donate page itself', () => {
    mockUsePathname.mockReturnValue('/donate');
    render(<SiteFooter />);
    expect(screen.queryByText(/Enjoying what FACT is building/i)).not.toBeInTheDocument();
  });

  it('always keeps the About Us nav link and Instagram handle', () => {
    mockUsePathname.mockReturnValue('/');
    render(<SiteFooter />);
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');
    expect(screen.getByText('@psa_fact')).toBeInTheDocument();
  });
});
