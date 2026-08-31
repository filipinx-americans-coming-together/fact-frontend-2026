import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Matches the 2025 registration/admin flows' expectation that static-data/*.json
// under /public is the fallback data source whenever API_URL is unset (see
// src/util/constants.tsx). Tests mock global.fetch against those same fixtures
// so hooks exercise the exact code path the deployed static build uses.
export function renderWithQueryClient(ui: ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

export function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
