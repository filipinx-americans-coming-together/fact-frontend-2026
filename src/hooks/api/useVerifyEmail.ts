import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchVerifyEmail(email: string, code: string): Promise<void> {
    console.log(email, code);
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/verifications/verify/`,
        method: "POST",
        body: JSON.stringify({ email: email, code: code }),
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

export function useVerifyEmail() {
    const {
        data,
        error,
        isPending,
        mutate: verifyEmail,
        isSuccess,
    } = useMutation({
        mutationFn: ({ email, code }: { email: string; code: string }) => {
            return fetchVerifyEmail(email, code);
        },
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, verifyEmail, isSuccess };
}
