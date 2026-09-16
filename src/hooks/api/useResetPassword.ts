import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { useMutation } from "@tanstack/react-query";

async function fetchResetPassword(
    password: string,
    token: string
): Promise<void> {
    const endpoint = `${API_URL}/registration/users/reset-password/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ password: password, token: token }),
    });

    await parseApiResponse(response, endpoint, "POST");
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
