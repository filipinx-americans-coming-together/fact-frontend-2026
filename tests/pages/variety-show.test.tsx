import { describe, expect, it, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
    expect(screen.getByRole('link', { name: 'Register for FACT' })).toHaveAttribute('href', '/my-fact/create-account');
  });

  it('explains the UIUC -VSHOW code', () => {
    render(<VarietyShow />);

    expect(screen.getByText(/Use the UIUC promo code that was sent out/)).toBeInTheDocument();
    expect(screen.getAllByText(/-VSHOW/).length).toBeGreaterThan(0);
  });

  it('shows the date, venue, and times', () => {
    render(<VarietyShow />);

    expect(screen.getByText(', October 17')).toBeInTheDocument();
    expect(screen.getByText('Foellinger Auditorium')).toBeInTheDocument();
    expect(screen.getByText('5:30 PM')).toBeInTheDocument();
  });

  it('offers a direct Eventbrite link with the show-only code in case the widget is blocked', () => {
    render(<VarietyShow />);

    expect(screen.getByRole('link', { name: /Get tickets on Eventbrite/ })).toHaveAttribute(
      'href',
      'https://www.eventbrite.com/e/2001120979719?discount=VSHOWONLY',
    );
  });

  it('crowns Lyn Lapid as headliner with her photo and Instagram, no toggle', () => {
    render(<VarietyShow />);

    expect(screen.getByRole('heading', { level: 3, name: /Headliner\s+Lyn Lapid/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /@_lynlapid/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/_lynlapid/',
    );
    expect(screen.getByRole('img', { name: 'Lyn Lapid' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /about Lyn Lapid/ })).not.toBeInTheDocument();
    expect(screen.queryByText('to be revealed')).not.toBeInTheDocument();
  });

  it('lists all eleven acts in performance order', () => {
    render(<VarietyShow />);

    expect(screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent)).toEqual([
      'Kumantayo',
      'Tropang Pinoy',
      'RVN',
      'UC Ritmo',
      'KasaTigre',
      'Sierra Sikora',
      'PSA Lumaya',
      'Purple Cakes',
      'PSA Harana',
      'FIA Modern',
      'PSA Barkada',
    ]);
  });

  it('opens an act blurb and its links from the toggle', () => {
    render(<VarietyShow />);

    const toggle = screen.getByRole('button', { name: /More about Kumantayo/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    // The details region lives inside a plain list item, so the acts list
    // keeps valid list semantics while it is open.
    const region = screen.getByRole('region', { name: 'About Kumantayo' });
    expect(region.closest('li')).not.toHaveAttribute('role');
    expect(screen.getByText(/first and only Filipinx American music performance group/)).toBeVisible();
    expect(screen.getByRole('link', { name: /@kumantayo/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/kumantayo/',
    );
  });
});
