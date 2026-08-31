import { API_URL } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<{ username: string }> {
    const response = await fetch(`${API_URL}/fact-admin/me/`, {
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

    // user data
    return { username: json[0].fields.username };
}

export function useAdminUser(): {
    user: { username: string } | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: user,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["active-user"],
        queryFn: () => fetchUser(),
        retry: 0,
    });

    return { user, isLoading, error };
}
