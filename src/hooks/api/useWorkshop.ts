import { API_URL } from "@/util/constants";
import {
    FacilitatorData,
    LocationData,
    ResponseData,
    WorkshopData,
    WorkshopResponse,
} from "@/util/types";
import { useQuery } from "@tanstack/react-query";

async function fetchWorkshop({ id }: { id: number }): Promise<{
    workshop: WorkshopData;
    location: LocationData;
    facilitators: FacilitatorData[];
    // registrations: number;
    facilitator_assistants?: { name: string; contact: string }[];
}> {
    let json;

    if (API_URL.length === 0) {
        const allWorkshops = await fetch('/static-data/workshops-by-id.json').then(r=>r.json());
        json = allWorkshops[id.toString()]; 
    }
    else {
        const response = await fetch(`${API_URL}/registration/workshops/${id}`, {
            credentials: "include",
        });

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

    const workshopData = json.workshop[0];

    const formattedWorkshop: WorkshopData = {
        id: workshopData.pk,
        title: workshopData.fields.title,
        description: workshopData.fields.description,
        facilitators: json.facilitators[0].fields.department_name,
        registrationCount: json.registrations,
        location: workshopData.fields.location,
        session: workshopData.fields.session,
    };

    const locationData = json.location[0];

    const formattedLocation: LocationData = {
        id: locationData.pk,
        room_num: locationData.fields.room_num,
        building: locationData.fields.building,
        capacity: locationData.fields.capacity,
        session: locationData.fields.session,
    };
    
    const facilitatorData = json.facilitators;

    const formattedFacilitators: FacilitatorData[] = facilitatorData.map((facilitator: any) => ({
        id: facilitator.pk,
        department_name: facilitator.fields.department_name,
        facilitator_names: facilitator.fields.facilitators
            .split(",")
            .map((name: string) => name.trim()),
        image_url: facilitator.fields.image_url,
        position: facilitator.fields.position,
        bio: facilitator.fields.bio,
        attending_networking_session: facilitator.fields.attending_networking_session,
    }));

    const formattedAssistants = json.facilitator_assistants?.map(
        (fa: ResponseData<{ name: string; contact: string }>) => {
            return { name: fa.fields.name, contact: fa.fields.contact };
        }
    );

    return {
        workshop: formattedWorkshop,
        location: formattedLocation,
        facilitators: formattedFacilitators,
        // registrations: json.registrations,
        facilitator_assistants: formattedAssistants,
    };
}

export function useWorkshop({ id }: { id: number }): {
    workshop:
        | {
              workshop: WorkshopData;
              location: LocationData;
              facilitators: FacilitatorData[];
            //   registrations: number;
              facilitator_assistants?: { name: string; contact: string }[];
          }
        | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: workshop,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["workshops", id],
        queryFn: () => fetchWorkshop({ id: id }),
        retry: 0,
    });


    return { workshop, isLoading, error };
}