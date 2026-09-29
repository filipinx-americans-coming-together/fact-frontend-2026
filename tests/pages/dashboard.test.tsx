import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Dashboard's data hooks are mocked: these tests are about what it shows
// for a given user, not about fetching.
const mockUser = vi.fn();
vi.mock('../../src/hooks/api/useUser', () => ({ useUser: () => mockUser() }));
vi.mock('../../src/hooks/api/useLogout', () => ({ useLogout: () => ({ logout: vi.fn(), isSuccess: false, isPending: false }) }));
vi.mock('../../src/hooks/api/useNotifications', () => ({ useNotifications: () => ({ notifications: [] }) }));
vi.mock('../../src/hooks/api/useRegistrationFlag', () => ({ useRegistrationFlag: () => ({ flag: { value: false } }) }));
vi.mock('../../src/components/formatting/UserAgenda', () => ({ default: () => null }));
vi.mock('../../src/components/formatting/WorkshopCard', () => ({ default: () => null }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/my-fact/dashboard' }));

import Dashboard from '../../src/app/my-fact/dashboard/page';

function user(registration: { workshop: number }[]) {
  return {
    user: { user: { first_name: 'Jane', last_name: 'Doe' }, delegate: {}, registration },
    isLoading: false,
    error: null,
  };
}

describe('Dashboard', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('shows Edit Profile before the delegate has registered for workshops', () => {
    mockUser.mockReturnValue(user([]));
    render(<Dashboard />);

    expect(screen.getByRole('link', { name: /edit profile/i })).toHaveAttribute('href', '/my-fact/profile');
    expect(screen.getByRole('link', { name: 'Register for FACT 2026' })).toBeInTheDocument();
  });

  it('shows Edit Profile after registering too', () => {
    mockUser.mockReturnValue(user([{ workshop: 1 }]));
    render(<Dashboard />);

    expect(screen.getByRole('link', { name: /edit profile/i })).toHaveAttribute('href', '/my-fact/profile');
  });

  it('marks step 2 before registering and step 3 after', () => {
    mockUser.mockReturnValue(user([]));
    const { unmount } = render(<Dashboard />);
    expect(document.querySelector('[aria-current="step"]')).toHaveTextContent('Step 2: Register');
    unmount();

    mockUser.mockReturnValue(user([{ workshop: 1 }]));
    render(<Dashboard />);
    expect(document.querySelector('[aria-current="step"]')).toHaveTextContent("Step 3: You're In!");
  });
});
