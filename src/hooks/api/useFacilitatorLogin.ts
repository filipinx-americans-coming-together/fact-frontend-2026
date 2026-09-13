import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { UserData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchLogin(
    username: string,
    password: string
): Promise<{
    user: UserData;
}> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/facilitators/login/`,
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
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
    const userData = json.user[0];

    const formattedUser: UserData = {
        id: userData.pk,
        first_name: userData.fields.first_name,
        last_name: userData.fields.last_name,
        email: userData.fields.email,
    };

    return {
        user: formattedUser,
    };
}

export function useFacilitatorLogin() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: login,
        isSuccess,
    } = useMutation({
        mutationFn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => {
            return fetchLogin(username, password);
        },

        onSuccess: (data) => queryClient.setQueryData(["active-profile"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, login, isSuccess };
}
