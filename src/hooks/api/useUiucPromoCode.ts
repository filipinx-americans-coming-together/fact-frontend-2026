import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

export interface UiucPromoCodeResult {
    code: string;
    ticket_type: string;
}

async function fetchUiucPromoCode(ticketType: string): Promise<UiucPromoCodeResult> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/uiuc-promo-code/`,
        method: "POST",
        body: JSON.stringify({ ticket_type: ticketType }),
    });

    let json;

    try {
        json = await response.json();
    } catch {
        throw new Error("Server error, please try again later");
    }

    if (!response.ok) {
        let message = "Server error, please try again later";

        if (json.message && response.status !== 500) {
            message = json.message;
        }

        throw new Error(message);
    }

    return json;
}

export function useUiucPromoCode() {
    const {
        data,
        error,
        isPending,
        mutate: getPromoCode,
        mutateAsync: getPromoCodeAsync,
        isSuccess,
    } = useMutation({
        mutationFn: (ticketType: string) => fetchUiucPromoCode(ticketType),
    });

    return { data, error, isPending, getPromoCode, getPromoCodeAsync, isSuccess };
}
