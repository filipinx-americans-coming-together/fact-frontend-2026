import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { AgendaItemData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AgendaItemProps {
    title: string;
    start_time: Date;
    end_time: Date;
    building: string | undefined;
    room_num: string | undefined;
    session_num: number | undefined;
}

async function fetchCreateAgendaItem(
    props: AgendaItemProps
): Promise<AgendaItemData> {
    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/fact-admin/agenda-items/`,
        method: "POST",
        body: JSON.stringify({
            title: props.title,
            start_time: props.start_time.toISOString(),
            end_time: props.end_time.toISOString(),
            building: props.building,
            room_num: props.room_num,
            session_num: props.session_num,
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
        title: json[0].fields.message,
        start_time: new Date(Date.parse(json[0].fields.start_time)),
        end_time: new Date(Date.parse(json[0].fields.end_time)),
        building: json[0].fields.building,
        room_num: json[0].fields.room_num,
        session_num: json[0].fields.session_num,
    };

    return formatted;
}

export function useCreateAgendaItem() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: createAgendaItem,
        isSuccess,
    } = useMutation({
        mutationFn: (props: AgendaItemProps) => {
            return fetchCreateAgendaItem(props);
        },

        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ["agenda"],
                type: "active",
            }),
    });

    return { data, error, isPending, createAgendaItem, isSuccess };
}
