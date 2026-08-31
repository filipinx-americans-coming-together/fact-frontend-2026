import { describe, expect, it, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { SiteHeader } from '../../../src/components/site/SiteHeader';

describe('SiteHeader', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the full hero on the home page', () => {
    render(<SiteHeader />);
    expect(screen.getByAltText(/Mahiwagahan/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll for more')).toBeInTheDocument();
  });

  it('renders the compact page title on interior pages', () => {
    render(<SiteHeader compact pageTitle="About Us" pageSubtitle="The story and mission behind FACT." />);
    expect(screen.getByRole('heading', { level: 1, name: 'About Us' })).toBeInTheDocument();
    expect(screen.getByText('The story and mission behind FACT.')).toBeInTheDocument();
  });

  it('keeps the Login control disabled — registration is not live yet', () => {
    render(<SiteHeader compact pageTitle="Test" />);
    const login = screen.getByRole('button', { name: /Login/i });
    expect(login).toHaveAttribute('aria-disabled', 'true');
  });

  it('links Donate to /donate', () => {
    render(<SiteHeader compact pageTitle="Test" />);
    expect(screen.getByRole('link', { name: 'Donate' })).toHaveAttribute('href', '/donate');
  });

  it('marks the current page in nav via aria-current', () => {
    render(<SiteHeader compact pageTitle="About Us" active="about" />);
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('aria-current', 'page');
  });
});
