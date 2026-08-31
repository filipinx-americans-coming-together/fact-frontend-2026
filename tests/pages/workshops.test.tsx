import { describe, expect, it, vi, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { renderWithQueryClient, jsonResponse } from '../testUtils';
import WorkshopsPage from '../../src/app/(live)/workshops/page';

const WORKSHOPS = [
  {
    model: 'registration.workshop',
    pk: 1,
    fields: { title: 'Owning Your Narrative', description: 'A storytelling workshop.', location: 1, session: 1, facilitators: null },
  },
  {
    model: 'registration.workshop',
    pk: 2,
    fields: { title: 'Breaking Into Tech', description: 'Career panel.', location: 1, session: 2, facilitators: ['Ada Lovelace'] },
  },
];

describe('Workshops page', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('groups real workshop data by session and filters via search', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('workshops-by-id')) return Promise.resolve(jsonResponse({}));
        return Promise.resolve(jsonResponse(WORKSHOPS));
      })
    );

    renderWithQueryClient(<WorkshopsPage />);

    expect(await screen.findByText('Owning Your Narrative')).toBeInTheDocument();
    expect(screen.getByText('Breaking Into Tech')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Session 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Session 2' })).toBeInTheDocument();
    expect(screen.getByText(/Facilitated by Ada Lovelace/)).toBeInTheDocument();

    const search = screen.getByPlaceholderText(/Search workshops/i);
    await userEvent.type(search, 'tech');

    await waitFor(() => expect(screen.queryByText('Owning Your Narrative')).not.toBeInTheDocument());
    expect(screen.getByText('Breaking Into Tech')).toBeInTheDocument();
  });

  it('shows the empty state when a search matches nothing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('workshops-by-id')) return Promise.resolve(jsonResponse({}));
        return Promise.resolve(jsonResponse(WORKSHOPS));
      })
    );

    renderWithQueryClient(<WorkshopsPage />);
    await screen.findByText('Owning Your Narrative');

    const search = screen.getByPlaceholderText(/Search workshops/i);
    await userEvent.type(search, 'zzznomatch');

    expect(await screen.findByText(/No workshops match your search/i)).toBeInTheDocument();
  });
});
