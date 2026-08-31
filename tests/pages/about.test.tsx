import { describe, expect, it, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AboutPage from '../../src/app/(live)/about/page';

describe('About page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the mission statement and photo carousel', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'What is FACT?' })).toBeInTheDocument();
    expect(screen.getByText(/FACT Mission Statement/)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem', { name: '' }).length).toBeGreaterThan(0);
    // 7 carousel photos, per live's original content
    expect(screen.getAllByAltText(/FACT/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Photo 1 of 7')).toBeInTheDocument();
    expect(screen.getByLabelText('Photo 7 of 7')).toBeInTheDocument();
  });
});
