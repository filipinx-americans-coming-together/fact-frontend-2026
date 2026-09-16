import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useMutation } from "@tanstack/react-query";

export interface VerifyPaymentResult {
    payment_status: string;
    ticket_type: string;
}

async function fetchVerifyPayment(orderId: string): Promise<VerifyPaymentResult> {
    const endpoint = `${API_URL}/registration/verify-payment/`;

    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ order_id: orderId }),
    });

    return parseApiResponse(response, endpoint, "POST");
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
