import { API_URL } from "@/util/constants";
import {
    DelegateData,
    RegistrationData,
    UserData,
    UserResponse,
} from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<{
    user: UserData;
    delegate: DelegateData;
    registration: RegistrationData[] | null;
}> {
    const response = await fetch(`${API_URL}/registration/delegates/me/`, {
        credentials: "include",
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

export function useUser(): {
    user:
        | {
              user: UserData;
              delegate: DelegateData;
              registration: RegistrationData[] | null;
          }
        | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: user,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["active-user"],
        queryFn: () => fetchUser(),
        retry: 0,
    });

    return {user, isLoading, error };
}
