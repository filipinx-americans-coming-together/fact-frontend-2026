import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface RegisterFacilitatorProps {
    facilitator_name: string;
    workshops: (number | undefined)[];
}

async function fetchRegisterFacilitator(
    {facilitator_name, workshops}: RegisterFacilitatorProps
): Promise<void> {

    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/facilitators/register/`,
        method: "PUT",
        body: JSON.stringify({facilitator_name: facilitator_name, workshops: workshops})
    })

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
    

    console.log(response);
}

export function useRegisterFacilitator() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: registerFacilitator,
        isSuccess,
    } = useMutation({
        mutationFn: (props: RegisterFacilitatorProps) => {
            return fetchRegisterFacilitator(props);
        },

        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ["active-profile"],
                type: "active",
            }),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, registerFacilitator, isSuccess };
}
