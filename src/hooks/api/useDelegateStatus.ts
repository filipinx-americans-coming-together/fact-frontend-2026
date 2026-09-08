import { API_URL } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";

export interface DelegateStatus {
    is_authenticated: boolean;
    is_uiuc_verified?: boolean;
    ticket_type?: string | null;
    payment_status?: string;
    has_unredeemed_promo?: { [ticketType: string]: string };
}

async function fetchDelegateStatus(): Promise<DelegateStatus> {
    const response = await fetch(`${API_URL}/registration/delegate-status/`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Server error, please try again later");
    }

    return await response.json();
}

export function useDelegateStatus() {
    const {
        data: status,
        error,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["delegate-status"],
        queryFn: () => fetchDelegateStatus(),
        retry: 0,
    });

    return { status, isLoading, error, refetch };
}
