import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { DelegateData, RegistrationData, UserData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchLogin(
    email: string,
    password: string
): Promise<{
    user: UserData;
    delegate: DelegateData;
    registration: RegistrationData[];
}> {
    const endpoint = `${API_URL}/registration/delegates/login/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
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

    // delegate data
    const delegateData = json.delegate[0];

    const formattedDelegate: DelegateData = {
        id: delegateData.pk,
        pronouns: delegateData.fields.pronouns,
        year: delegateData.fields.year,
        school: delegateData.fields.school,
    };

    // registration data
    const registrationData = json.registration;
    const formattedRegistration: RegistrationData[] = [];

    for (let i = 0; i < registrationData.length; i++) {
        const formatted: RegistrationData = {
            delegate: registrationData[i].fields.delegate,
            workshop: registrationData[i].fields.workshop,
        };

        formattedRegistration.push(formatted);
    }

    return {
        user: formattedUser,
        delegate: formattedDelegate,
        registration: formattedRegistration,
    };
}

export function useLogin() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: login,
        isSuccess,
    } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return fetchLogin(email, password);
        },

        onSuccess: (data) => queryClient.setQueryData(["active-profile"], data),
    });

    return { data, error, isPending, login, isSuccess };
}
