import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { parseApiResponse } from "@/util/apiError";
import { DelegateData, RegistrationData, UserData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateUserProps {
    f_name?: string;
    l_name?: string;
    email?: string;
    pronouns?: string;
    year?: string;
    school_id?: number;
    workshop_1_id?: number;
    workshop_2_id?: number;
    workshop_3_id?: number;
    password?: string;
    new_password?: string;
}

async function fetchUpdateUser(props: UpdateUserProps): Promise<{
    user: UserData;
    delegate: DelegateData;
    registration: RegistrationData[];
}> {
    const endpoint = `${API_URL}/registration/delegates/me/`;

    // request
    const response = await fetchWithCredentials({
        url: endpoint,
        method: "PUT",
        body: JSON.stringify(props),
    });

    const json = await parseApiResponse(response, endpoint, "PUT");

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

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: updateUser,
        isSuccess,
    } = useMutation({
        mutationFn: (props: UpdateUserProps) => {
            return fetchUpdateUser(props);
        },

        onSuccess: (data) => queryClient.setQueryData(["active-profile"], data),
    });

    return { data, error, isPending, updateUser, isSuccess };
}
