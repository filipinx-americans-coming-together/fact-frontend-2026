import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { NotificationData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchCreateNotification({
    message,
    expiration,
}: {
    message: string;
    expiration: Date;
}): Promise<NotificationData> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/notifications/`,
        method: "POST",
        body: JSON.stringify({
            message: message,
            expiration: expiration.toISOString(),
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

    // format date
    const formatted = {
        id: json[0].pk,
        message: json[0].fields.message,
        expiration: new Date(Date.parse(json[0].fields.expiration)),
    };

    return formatted;
}

export function useCreateNotification() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: createNotification,
        isSuccess,
    } = useMutation({
        mutationFn: (props: { message: string; expiration: Date }) => {
            return fetchCreateNotification(props);
        },

        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ["notifications"],
                type: "active",
            }),
    });

    return { data, error, isPending, createNotification, isSuccess };
}
