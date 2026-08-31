import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NotFound from '../../src/app/not-found';

vi.mock('next/navigation', () => ({ usePathname: () => '/some/missing/route' }));

describe('Custom 404 page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('replaces the framework default with a styled page and a way back home', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { name: 'Page Not Found' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Home' })).toHaveAttribute('href', '/');
  });
});
