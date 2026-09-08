import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchPromoteAdmin(email: string): Promise<{ message: string }> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/accounts/promote/`,
        method: "POST",
        body: JSON.stringify({ email }),
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

export function usePromoteAdmin() {
    const {
        data,
        error,
        isPending,
        mutate: promoteAdmin,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: (email: string) => fetchPromoteAdmin(email),
    });

    return { data, error, isPending, promoteAdmin, isSuccess, reset };
}
