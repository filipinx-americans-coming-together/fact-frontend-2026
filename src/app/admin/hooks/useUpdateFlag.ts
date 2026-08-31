import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUpdateFlag(
    label: string,
    value: boolean
): Promise<{ label: string; value: boolean }> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/flags/${label}/`,
        method: "PUT",
        body: JSON.stringify({
            value: value,
        }),
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

    return {
        label: json[0].fields.label,
        value: json[0].fields.value,
    };
}

export function useUpdateFlag() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: updateFlag,
        isSuccess,
    } = useMutation({
        mutationFn: (props: { label: string; value: boolean }) => {
            return fetchUpdateFlag(props.label, props.value);
        },

        onSuccess: (data) =>
            queryClient.setQueryData(["flag", data.label], data),
    });

    return { data, error, isPending, updateFlag, isSuccess };
}
