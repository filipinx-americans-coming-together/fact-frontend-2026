import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
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
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/delegates/me/`,
        method: "PUT",
        body: JSON.stringify(props),
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

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, updateUser, isSuccess };
}
