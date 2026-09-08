import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

export interface VerifyPaymentResult {
    payment_status: string;
    ticket_type: string;
}

async function fetchVerifyPayment(orderId: string): Promise<VerifyPaymentResult> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/verify-payment/`,
        method: "POST",
        body: JSON.stringify({ order_id: orderId }),
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

export function useVerifyPayment() {
    const {
        data,
        error,
        isPending,
        mutate: verifyPayment,
        mutateAsync: verifyPaymentAsync,
        isSuccess,
    } = useMutation({
        mutationFn: (orderId: string) => fetchVerifyPayment(orderId),
    });

    return { data, error, isPending, verifyPayment, verifyPaymentAsync, isSuccess };
}
