import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

async function fetchSetUpAccount(
    email: string,
    password: string,
    token: string
): Promise<void> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/facilitators/set-up/`,
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            token: token,
        }),
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

export function useSetUpFacilitatorAccount() {
    const {
        data,
        error,
        isPending,
        mutate: setUpAccount,
        isSuccess,
    } = useMutation({
        mutationFn: ({
            email,
            password,
            token,
        }: {
            email: string;
            password: string;
            token: string;
        }) => {
            return fetchSetUpAccount(email, password, token);
        },
    });

    return { data, error, isPending, setUpAccount, isSuccess };
}
