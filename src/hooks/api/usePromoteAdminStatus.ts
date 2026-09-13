import { API_URL } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";

async function fetchPromoteAdminStatus(token: string): Promise<{ is_new_account: boolean }> {
    const response = await fetch(
        `${API_URL}/fact-admin/accounts/promote/status/${token}/`
    );

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

export function usePromoteAdminStatus(token: string) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["promote-admin-status", token],
        queryFn: () => fetchPromoteAdminStatus(token),
        retry: 0,
    });

    return { isNewAccount: data?.is_new_account, error, isLoading };
}
