import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useQuery } from "@tanstack/react-query";

/** A workshop-including order placed with the account's email. Masked: only the last 4 characters. */
export interface ExistingOrder {
    order_hint: string;
    ticket_type: string;
}

export interface FindMyOrderResult {
    already_paid: boolean;
    orders: ExistingOrder[];
}

const NO_ORDERS: ExistingOrder[] = [];

async function fetchFindMyOrder(): Promise<FindMyOrderResult> {
    const endpoint = `${API_URL}/registration/find-my-order/`;

    const response = await fetchWithCredentials({ url: endpoint, method: "GET" });

    // 503 = the backend couldn't reach Eventbrite. Fail open: a lookup
    // outage must never stop anyone from buying a ticket.
    if (response.status === 503) {
        return { already_paid: false, orders: [] };
    }

    return parseApiResponse(response, endpoint, "GET");
}

/**
 * GET /registration/find-my-order/. Only runs when `enabled` (logged in and
 * not already paid). Any failure leaves `orders` empty, so the register page
 * falls back to the normal checkout.
 */
export function useFindMyOrder(enabled: boolean) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["find-my-order"],
        queryFn: () => fetchFindMyOrder(),
        enabled,
        retry: 0,
    });

    return { orders: data?.orders ?? NO_ORDERS, isLoading, error };
}
