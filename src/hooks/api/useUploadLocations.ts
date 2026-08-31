import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { ResponseData, LocationData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUploadLocations(file: File): Promise<LocationData[]> {
    const formData = new FormData();
    formData.append("locations", file);

    // request
    const response = await fetch(`${API_URL}/registration/locations/bulk/`, {
        credentials: "include",
        method: "POST",
        body: formData,
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

    const formatted_data = json.map((location: ResponseData<LocationData>) => {
        const formatted = {
            building: location.fields.building,
            room_num: location.fields.room_num,
            capacity: location.fields.capacity,
            session: location.fields.session,
        };

        return formatted;
    });

    return formatted_data;
}

export function useUploadLocations() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: uploadLocations,
        isSuccess,
    } = useMutation({
        mutationFn: ({ file }: { file: File }) => {
            return fetchUploadLocations(file);
        },

        onSuccess: (data) => queryClient.setQueryData(["workshops"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, uploadLocations, isSuccess };
}
