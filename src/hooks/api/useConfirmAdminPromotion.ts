import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchConfirmAdminPromotion(token: string): Promise<{ message: string }> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/accounts/promote/confirm/`,
        method: "POST",
        body: JSON.stringify({ token }),
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

export function useConfirmAdminPromotion() {
    const {
        data,
        error,
        isPending,
        mutate: confirmPromotion,
        isSuccess,
    } = useMutation({
        mutationFn: (token: string) => fetchConfirmAdminPromotion(token),
    });

    return { data, error, isPending, confirmPromotion, isSuccess };
}
