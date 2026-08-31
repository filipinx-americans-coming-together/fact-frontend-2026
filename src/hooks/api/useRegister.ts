import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { DelegateData, RegistrationData, UserData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface registrationProps {
    f_name: string;
    l_name: string;
    email: string;
    workshop_1_id: string;
    workshop_2_id: string;
    workshop_3_id: string;
}

async function fetchRegister(props: registrationProps): Promise<{
    user: UserData;
    registration: RegistrationData[];
}> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/delegates/`,
        method: "POST",
        body: JSON.stringify(props),
    });

    // console.log("props", props)

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
        registration: formattedRegistration,
    };
}

export function useRegister() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: register,
        isSuccess,
    } = useMutation({
        mutationFn: (props: registrationProps) => {
            console.log("props",props)
            return fetchRegister(props);
        },

        onSuccess: (data) => queryClient.setQueryData(["active-profile"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, register, isSuccess };
}
