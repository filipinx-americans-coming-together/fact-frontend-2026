import { API_URL } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";

async function fetchRegistrationFlag({ label }: { label: string }): Promise<{
    label: string;
    value: boolean;
}> {
    const response = await fetch(`${API_URL}/fact-admin/flags/${label}/`);

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

    return {
        label: json[0].fields.label,
        value: json[0].fields.value,
    };
}

export function useRegistrationFlag(label: string): {
    flag: { label: string; value: boolean } | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: flag,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["flag", label],
        queryFn: () => fetchRegistrationFlag({ label: label }),
    });

    return { flag, isLoading, error };
}
