import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import VarietyShow from '../../src/app/(live)/variety-show/page';

vi.mock('next/navigation', () => ({ usePathname: () => '/variety-show' }));

describe('Variety Show page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('says the tickets are show-only and points workshop-goers to registration', () => {
    render(<VarietyShow />);

    expect(screen.getByText(/These tickets are for the Variety Show only/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register here' })).toHaveAttribute('href', '/my-fact/create-account');
  });

  it('explains the UIUC -VSHOW code', () => {
    render(<VarietyShow />);

    expect(screen.getByText(/Use the UIUC promo code that was sent out/)).toBeInTheDocument();
    expect(screen.getAllByText(/-VSHOW/).length).toBeGreaterThan(0);
  });
});
