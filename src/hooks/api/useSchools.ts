import { API_URL } from "@/util/constants";
import { ResponseData, SchoolData } from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchSchools(): Promise<SchoolData[]> {
    const response = await fetch(`${API_URL}/registration/schools/`);

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

    let formatted_data = json.map((school: ResponseData<SchoolData>) => {
        return { id: school.pk, name: school.fields.name };
    });

    return formatted_data;
}

export function useSchools(): {
    schools: SchoolData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: schools,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["schools"],
        queryFn: () => fetchSchools(),
        retry: 0,
    });

    return { schools, isLoading, error };
}
