import { API_URL } from "@/util/constants";
import { ResponseData, WorkshopData } from "@/util/types";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useWorkshop } from "./useWorkshop";

async function fetchWorkshops(): Promise<WorkshopData[]> {
    let json;

    if (API_URL.length === 0) {
        json = await fetch('./static-data/workshops.json').then(r=>r.json());
    }
    else {
        const response = await fetch(`${API_URL}/registration/workshops/`);

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
        console.log(json);
    }
    

    const formatted_data = json.map((workshop: ResponseData<WorkshopData>) => {
        const formatted = {
            id: workshop.pk,
            title: workshop.fields.title,
            description: workshop.fields.description,
            session: workshop.fields.session,
            facilitators: workshop.fields.facilitators,
            location: workshop.fields.location,
        };

        return formatted;
    });

    return formatted_data;
}

async function fetchRegistrationCount({id} : {id: number}): Promise<{ registrations: number }> {
    // json format num_registrations: number
    let json;

    if (API_URL.length === 0) {
        const allWorkshops = await fetch('/static-data/workshops-by-id.json').then(r=>r.json());
        json = allWorkshops[id.toString()]; 
    }
    else {
        const response = await fetch(`${API_URL}/registration/workshops/${id}`);
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
    const registrations = json.registrations;

    return registrations
}

export function useWorkshops(): {
    workshops: WorkshopData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: workshops,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["workshops"],
        queryFn: () => fetchWorkshops(),
        retry: 0,
    });

    workshops?.sort((a, b) => a.title.localeCompare(b.title)); // sort in alphabetical order
    workshops?.sort((a, b) => a.session - b.session);      // while keeping the sessions in order   

    const counts = useQueries({
        queries:
            workshops && workshops.length > 0
                ? workshops.map((workshop) => {
                      return {
                          queryKey: ["registration-counts", workshop.id],
                          queryFn: () => fetchRegistrationCount({id: workshop.id}),
                      };
                  })
                : [],
        combine: (results: any[]) => {
            return {
                data: results.map((result) => result.data),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
            };
        },
    });

    // combine results
    if (workshops && counts) {
        for (let i = 0; i < workshops.length; i++) {
            workshops[i].registrationCount = counts.data[i];
        }
    }

    return { workshops, isLoading, error };
}
