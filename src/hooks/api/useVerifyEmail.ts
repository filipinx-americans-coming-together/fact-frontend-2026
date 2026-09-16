import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useMutation } from "@tanstack/react-query";

async function fetchVerifyEmail(email: string, code: string): Promise<void> {
    const endpoint = `${API_URL}/verifications/verify/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ email: email, code: code }),
    });

    await parseApiResponse(response, endpoint, "POST");
}

export function useVerifyEmail() {
    const {
        data,
        error,
        isPending,
        mutate: verifyEmail,
        isSuccess,
    } = useMutation({
        mutationFn: ({ email, code }: { email: string; code: string }) => {
            return fetchVerifyEmail(email, code);
        },
    });

    return { data, error, isPending, verifyEmail, isSuccess };
}
