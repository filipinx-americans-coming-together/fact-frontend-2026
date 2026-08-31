import { API_URL } from "@/util/constants";
import { ResponseData, SchoolData } from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchNewSchools(): Promise<SchoolData[]> {
    const response = await fetch(`${API_URL}/registration/schools/new/`);

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

    const formatted_data = json.map((school: ResponseData<SchoolData>) => {
        const formatted = {
            id: school.pk,
            name: school.fields.name,
        };

        return formatted;
    });

    return formatted_data;
}

export function useNewSchools(): {
    newSchools: SchoolData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: newSchools,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["new-schools"],
        queryFn: () => fetchNewSchools(),
        retry: 0,
    });

    return { newSchools, isLoading, error };
}
