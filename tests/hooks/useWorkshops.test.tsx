import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useWorkshops } from '../../src/hooks/api/useWorkshops';
import { jsonResponse } from '../testUtils';

const RAW_WORKSHOPS = [
  {
    model: 'registration.workshop',
    pk: 2,
    fields: { title: 'Zebra Talk', description: 'z desc', location: 1, session: 2, facilitators: null },
  },
  {
    model: 'registration.workshop',
    pk: 1,
    fields: { title: 'Alpha Talk', description: 'a desc', location: 1, session: 1, facilitators: ['Jane Doe'] },
  },
  {
    model: 'registration.workshop',
    pk: 3,
    fields: { title: 'Beta Talk', description: 'b desc', location: 1, session: 1, facilitators: null },
  },
];

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useWorkshops', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sorts by session then alphabetically, same as the 2025 registration flow relied on', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('workshops-by-id')) {
          return Promise.resolve(
            jsonResponse({
              '1': { registrations: 0 },
              '2': { registrations: 0 },
              '3': { registrations: 0 },
            })
          );
        }
        return Promise.resolve(jsonResponse(RAW_WORKSHOPS));
      })
    );

    const { result } = renderHook(() => useWorkshops(), { wrapper });

    await waitFor(() => expect(result.current.workshops).toBeDefined());

    expect(result.current.workshops?.map((w) => w.title)).toEqual(['Alpha Talk', 'Beta Talk', 'Zebra Talk']);
    expect(result.current.workshops?.map((w) => w.session)).toEqual([1, 1, 2]);
  });

  it('surfaces a real workshop record shape (id, session, facilitators) unchanged from the API contract', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('workshops-by-id')) return Promise.resolve(jsonResponse({ '1': { registrations: 5 } }));
        return Promise.resolve(jsonResponse([RAW_WORKSHOPS[1]]));
      })
    );

    const { result } = renderHook(() => useWorkshops(), { wrapper });

    await waitFor(() => expect(result.current.workshops).toHaveLength(1));

    const [workshop] = result.current.workshops!;
    expect(workshop.id).toBe(1);
    expect(workshop.title).toBe('Alpha Talk');
    expect(workshop.facilitators).toEqual(['Jane Doe']);
  });
});
