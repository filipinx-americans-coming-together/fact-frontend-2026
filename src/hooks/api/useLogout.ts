import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchLogout() {
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/users/logout/`,
        method: "POST",
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

export function useLogout() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: logout,
        isSuccess,
    } = useMutation({
        mutationFn: () => fetchLogout(),
        onSuccess: () =>
            queryClient.removeQueries({ queryKey: ["active-profile"] }),
    });

    console.log("isSuccess from logout", isSuccess);

    return { data, error, isPending, logout, isSuccess };
}
