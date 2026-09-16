import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useMutation } from "@tanstack/react-query";

async function fetchRequestEmailVerification(email: string): Promise<void> {
    const endpoint = `${API_URL}/verifications/request/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({
            email: email,
            email_subject: "FACT One-Time Verification Code",
        }),
    });

    await parseApiResponse(response, endpoint, "POST");
}

export function useRequestEmailVerification() {
    const {
        data,
        error,
        isPending,
        mutate: requestVerification,
        isSuccess,
    } = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return fetchRequestEmailVerification(email);
        },
    });

    return { data, error, isPending, requestVerification, isSuccess };
}
