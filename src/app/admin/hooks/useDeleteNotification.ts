import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchDeleteNotification(id: number): Promise<void> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/notifications/${id}/`,
        method: "DELETE",
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

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: deleteNotification,
        isSuccess,
    } = useMutation({
        mutationFn: (props: { id: number }) => {
            return fetchDeleteNotification(props.id);
        },

        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ["notifications"],
                type: "active",
            }),
    });

    return { data, error, isPending, deleteNotification, isSuccess };
}
