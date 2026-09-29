import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useFindMyOrder } from '../../src/hooks/api/useFindMyOrder';

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function stubFetch(status: number, body: unknown) {
  const fetchMock = vi.fn((url: string) => {
    if (url.includes('/csrf/')) {
      return Promise.resolve(new Response(null, { status: 200, headers: { 'X-CSRFToken': 'token' } }));
    }
    return Promise.resolve(
      new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
    );
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('useFindMyOrder', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the masked orders from the backend', async () => {
    const fetchMock = stubFetch(200, { already_paid: false, orders: [{ order_hint: '…9203', ticket_type: 'bundle' }] });

    const { result } = renderHook(() => useFindMyOrder(true), { wrapper });

    await waitFor(() => expect(result.current.orders).toHaveLength(1));
    expect(result.current.orders).toEqual([{ order_hint: '…9203', ticket_type: 'bundle' }]);
    expect(fetchMock.mock.calls.some(([url]) => String(url).endsWith('/registration/find-my-order/'))).toBe(true);
  });

  it('treats an Eventbrite outage (503) as no orders so checkout is never blocked', async () => {
    stubFetch(503, { message: 'Could not check Eventbrite' });

    const { result } = renderHook(() => useFindMyOrder(true), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('does not call the backend when disabled', () => {
    const fetchMock = stubFetch(200, { already_paid: false, orders: [] });

    const { result } = renderHook(() => useFindMyOrder(false), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.orders).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
