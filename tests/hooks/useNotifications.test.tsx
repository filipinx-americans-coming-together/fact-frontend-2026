import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useNotifications } from '../../src/hooks/api/useNotifications';
import { jsonResponse } from '../testUtils';

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useNotifications', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reshapes pk/fields records into {id, message, expiration}, same contract the home page banner relies on', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          jsonResponse([{ pk: 7, fields: { message: 'Registration opens soon', expiration: '2026-10-01T00:00:00Z' } }])
        )
      )
    );

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await waitFor(() => expect(result.current.notifications).toBeDefined());

    expect(result.current.notifications).toEqual([
      { id: 7, message: 'Registration opens soon', expiration: new Date('2026-10-01T00:00:00Z') },
    ]);
  });

  it('handles the empty-array fallback from static-data/notifications.json without erroring', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(jsonResponse([]))));

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await waitFor(() => expect(result.current.notifications).toEqual([]));
    expect(result.current.error).toBeNull();
  });
});
