import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import RefundPage from '../../src/app/refund/page';
import RegistrationClosedPage from '../../src/app/registration-closed/page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));

// These routes were not touched by the live-repo merge — they still run
// 2025's own Navbar/Footer, MUI, and Tailwind gradient styling untouched.
// Regression coverage: confirm the shared globals.css / Tailwind v4 @theme
// swap didn't break the pages the merge wasn't supposed to change.
describe('Untouched 2025 routes still render after the merge', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('refund page still renders its Navbar and Google Form embed', () => {
    render(<RefundPage />);
    expect(screen.getByRole('link', { name: /FACT Logo/i })).toBeInTheDocument();
    expect(document.querySelector('iframe')).toHaveAttribute('src', expect.stringContaining('docs.google.com/forms'));
  });

  it('registration-closed page still renders', () => {
    render(<RegistrationClosedPage />);
    expect(document.body.textContent).toBeTruthy();
  });
});
