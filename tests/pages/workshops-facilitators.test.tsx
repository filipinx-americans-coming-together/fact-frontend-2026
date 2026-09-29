import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { renderWithQueryClient, jsonResponse } from '../testUtils';
import WorkshopsPage from '../../src/app/(live)/workshops/page';

const WORKSHOPS = [
  { model: 'registration.workshop', pk: 7, fields: { title: 'Panel Talk', description: 'd', location: 1, session: 1, facilitators: null } },
];
const facilitator = (name: string, opaque: boolean) => ({
  fields: {
    department_name: name, facilitators: [], bio: `${name} bio`, position: '',
    image_url: `https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/facilitators/${name}.png`,
    photo_width: 200, photo_height: 100, photo_blur: '', photo_opaque: opaque,
  },
});
const ALL = { '7': { workshop: [], location: [], registrations: 0, facilitators: [facilitator('Alpha', true), facilitator('Beta', false)] } };

describe('Workshops page facilitator cards', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('lists every panel facilitator and shadows only opaque photos', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      if (url.includes('/workshops/all/')) return Promise.resolve(jsonResponse(ALL));
      if (url.includes('/workshops/7')) return Promise.resolve(jsonResponse({ registrations: 0 }));
      if (url.includes('/locations')) return Promise.resolve(jsonResponse([]));
      return Promise.resolve(jsonResponse(WORKSHOPS));
    }));

    renderWithQueryClient(<WorkshopsPage />);
    const trigger = await screen.findByRole('button', { name: 'Facilitated by Alpha, Beta' });
    await userEvent.click(trigger);

    const alpha = screen.getByAltText('Alpha');
    const beta = screen.getByAltText('Beta');
    expect(alpha).toHaveClass('workshop__bioPhoto--shadow');
    expect(beta).not.toHaveClass('workshop__bioPhoto--shadow');
    expect(screen.getByText('Beta bio')).toBeInTheDocument();
  });
});
