import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

interface ConfirmResetProps {
    token: string;
    password: string;
}

async function fetchConfirmAdminPasswordReset({
    token,
    password,
}: ConfirmResetProps): Promise<{ message: string }> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/accounts/reset-password/confirm/`,
        method: "POST",
        body: JSON.stringify({ token, password }),
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

export function useConfirmAdminPasswordReset() {
    const {
        data,
        error,
        isPending,
        mutate: confirmPasswordReset,
        isSuccess,
    } = useMutation({
        mutationFn: (props: ConfirmResetProps) => fetchConfirmAdminPasswordReset(props),
    });

    return { data, error, isPending, confirmPasswordReset, isSuccess };
}
