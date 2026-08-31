import { API_URL } from "@/util/constants";
import { NotificationData, ResponseData } from "@/util/types";
import { useQuery } from "@tanstack/react-query";
// import notifications from "./notifications.json";

async function fetchNotifications(): Promise<NotificationData[]> {
    let json;

    if (API_URL.length === 0 ) {
        json = await fetch('./static-data/notifications.json').then(r=>r.json());
    }
    else {
        const response = await fetch(`${API_URL}/fact-admin/notifications`);
        
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

    const formatted_data = json.map(
        (
            notification: ResponseData<{ message: string; expiration: string }>
        ) => {
            const formatted = {
                id: notification.pk,
                message: notification.fields.message,
                expiration: new Date(
                    Date.parse(notification.fields.expiration)
                ),
            };

            return formatted;
        }
    );

    return formatted_data;
}

export function useNotifications(): {
    notifications: NotificationData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: notifications,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => fetchNotifications(),
        retry: 0,
    });

    return { notifications, isLoading, error };
}
