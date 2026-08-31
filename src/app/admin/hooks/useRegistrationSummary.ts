import { API_URL } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";

interface RegistrationSummaryData {
    delegates: number;
    schools: number;
    registrations: Date[];
}

async function fetchRegistrationSummary(): Promise<RegistrationSummaryData> {
    const response = await fetch(`${API_URL}/fact-admin/summary/`, {
        credentials: "include",
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

    let summary = {
        delegates: json.delegates,
        schools: json.schools,
        registrations: json.registrations.map((date: string) => new Date(date)),
    };

    return summary;
}

export function useRegistrationSummary(): {
    summary: RegistrationSummaryData | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: summary,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["summary"],
        queryFn: () => fetchRegistrationSummary(),
        retry: 0,
    });

    return { summary, isLoading, error };
}
