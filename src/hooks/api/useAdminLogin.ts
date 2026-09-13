import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchAdminLogin(
    username: string,
    password: string
): Promise<{ username: string }> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/login/`,
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
    });

    console.log(response);

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

    return { username: json[0].fields.username };
}

export function useAdminLogin() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: login,
        isSuccess,
    } = useMutation({
        mutationFn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => {
            return fetchAdminLogin(username, password);
        },

        onSuccess: (data) => queryClient.setQueryData(["active-profile"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, login, isSuccess };
}
