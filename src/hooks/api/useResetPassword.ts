import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchResetPassword(
    password: string,
    token: string
): Promise<void> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/users/reset-password/`,
        method: "POST",
        body: JSON.stringify({ password: password, token: token }),
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

export function useResetPassword() {
    const {
        data,
        error,
        isPending,
        mutate: resetPassword,
        isSuccess,
    } = useMutation({
        mutationFn: ({
            password,
            token,
        }: {
            password: string;
            token: string;
        }) => {
            return fetchResetPassword(password, token);
        },
    });

    return { data, error, isPending, resetPassword, isSuccess };
}
