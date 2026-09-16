import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { UserData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchLogin(
    username: string,
    password: string
): Promise<{
    user: UserData;
}> {
    const endpoint = `${API_URL}/registration/facilitators/login/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
    });

    const json = await parseApiResponse(response, endpoint, "POST");

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

    return { data, error, isPending, login, isSuccess };
}
