import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchDeleteLocation(id: number): Promise<void> {
    // request
    console.log(id);
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/locations/${id}/`,
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

export function useDeleteLocation() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: deleteLocation,
        isSuccess,
    } = useMutation({
        mutationFn: (props: { id: number }) => {
            return fetchDeleteLocation(props.id);
        },

        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ["location"],
                type: "active",
            }),
    });

    return { data, error, isPending, deleteLocation, isSuccess };
}
