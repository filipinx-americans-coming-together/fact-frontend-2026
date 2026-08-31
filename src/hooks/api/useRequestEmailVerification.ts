import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchRequestEmailVerification(email: string): Promise<void> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/verifications/request/`,
        method: "POST",
        body: JSON.stringify({
            email: email,
            email_subject: "FACT One-Time Verification Code",
        }),
    });

    console.log("response",response.ok);

    let json;

    try {
        json = await response.json();
    } catch {
        // console.log("JSON", json);
        if (response.type == "cors") {
            throw new Error("Please disable \"Prevent Cross-Site Tracking\" on your browser and try again")
        }
        else {
            throw new Error("Server error, please try again later");
        }
    }

    if (!response.ok) {
        let message = "Server error, please try again later";

        if (json.message && response.status !== 500) {
            message = json.message;
        }

        throw new Error(message);
    }

    console.log("JSON", json);
}

export function useRequestEmailVerification() {
    const {
        data,
        error,
        isPending,
        mutate: requestVerification,
        isSuccess,
    } = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return fetchRequestEmailVerification(email);
        },
    });

    console.log("isSuccess", isSuccess);
    console.log("error",error);

    return { data, error, isPending, requestVerification, isSuccess };
}
