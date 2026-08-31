import { API_URL } from "@/util/constants";
import { ResponseData, LocationData } from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchLocations(): Promise<LocationData[]> {
    const response = await fetch(`${API_URL}/registration/locations/`);

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
            id: location.pk,
            building: location.fields.building,
            capacity: location.fields.capacity,
            room_num: location.fields.room_num,
            session: location.fields.session,
        };

        return formatted;
    });

    return formatted_data;
}

export function useLocations(): {
    locations: LocationData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: locations,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["locations"],
        queryFn: () => fetchLocations(),
        retry: 0,
    });

    return { locations, isLoading, error };
}
