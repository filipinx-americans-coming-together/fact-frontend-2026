import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation } from "@tanstack/react-query";

export interface DayOfDelegateProps {
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    pronouns?: string;
    year?: string;
    school_id?: string;
    other_school_name?: string;
    ticket_type: string;
    workshop_1_id?: string;
    workshop_2_id?: string;
    workshop_3_id?: string;
}

async function fetchCreateDayOfDelegate(props: DayOfDelegateProps): Promise<any> {
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/delegates/day-of/`,
        method: "POST",
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

    return json;
}

export function useCreateDayOfDelegate() {
    const {
        data,
        error,
        isPending,
        mutate: createDayOfDelegate,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: (props: DayOfDelegateProps) => fetchCreateDayOfDelegate(props),
    });

    return { data, error, isPending, createDayOfDelegate, isSuccess, reset };
}
