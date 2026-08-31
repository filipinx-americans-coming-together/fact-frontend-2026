import { API_URL } from "@/util/constants";
import {
    FacilitatorData,
    FacilitatorRegistrationData,
    FacilitatorResponse,
    FacilitatorWorkshopData,
    ResponseData,
} from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<{
    facilitator: FacilitatorData;
    registrations: FacilitatorRegistrationData[];
    workshops: FacilitatorWorkshopData[];
}> {
    const response = await fetch(`${API_URL}/registration/facilitators/me/`, {
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
    const facilitator = {
        id: json.facilitator[0].pk,
        department_name: json.facilitator[0].fields.department_name,
        facilitator_names: json.facilitator[0].fields.facilitators
            .split(",")
            .map((name: string) => name.trim()),
        image_url: json.facilitator[0].fields.image_url,
        position: json.facilitator[0].fields.position,
        bio: json.facilitator[0].fields.bio,
        attending_networking_session:
            json.facilitator[0].fields.attending_networking_session,
    };

    const registrations = json.registrations.map(
        (registration: ResponseData<FacilitatorRegistrationData>) => {
            return {
                facilitator_name: registration.fields.facilitator_name,
                workshop: registration.fields.workshop,
            };
        }
    );

    const workshops = json.workshops.map(
        (workshop: ResponseData<FacilitatorWorkshopData>) => {
            return {
                facilitator: workshop.fields.facilitator,
                workshop: workshop.fields.workshop,
            };
        }
    );

    return {
        facilitator: facilitator,
        registrations: registrations,
        workshops: workshops,
    };
}

export function useFacilitatorUser(): {
    user:
        | {
              facilitator: FacilitatorData;
              registrations: FacilitatorRegistrationData[];
              workshops: FacilitatorWorkshopData[];
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

    return { user, isLoading, error };
}
