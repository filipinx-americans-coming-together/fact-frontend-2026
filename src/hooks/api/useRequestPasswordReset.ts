import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useMutation } from "@tanstack/react-query";

async function fetchRequestPasswordReset(email: string): Promise<void> {
    const endpoint = `${API_URL}/registration/users/request-reset-password/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ email: email }),
    });

    await parseApiResponse(response, endpoint, "POST");
}

export function useRequestPasswordReset() {
    const {
        data,
        error,
        isPending,
        mutate: requestPasswordReset,
        isSuccess,
    } = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return fetchRequestPasswordReset(email);
        },
    });

    return { data, error, isPending, requestPasswordReset, isSuccess };
}
