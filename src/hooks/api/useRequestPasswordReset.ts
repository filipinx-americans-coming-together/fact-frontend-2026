import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchRequestPasswordReset(email: string): Promise<void> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/users/request-reset-password/`,
        method: "POST",
        body: JSON.stringify({ email: email }),
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
