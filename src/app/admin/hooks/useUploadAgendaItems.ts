import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { AgendaItemData, ResponseData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUploadAgendaItems(file: File): Promise<AgendaItemData[]> {
    const formData = new FormData();
    formData.append("agenda", file);

    // request
    const response = await fetch(`${API_URL}/fact-admin/agenda-items/bulk/`, {
        credentials: "include",
        method: "POST",
        body: formData,
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

    const items = json.map((item: ResponseData<AgendaItemData>) => {
        const formatted = {
            id: item.pk,
            title: item.fields.title,
            building: item.fields.building,
            room_num: item.fields.room_num,
            start_time: new Date(item.fields.start_time),
            end_time: new Date(item.fields.end_time),
            session_num: item.fields.session_num,
        };

        return formatted;
    });

    return items;
}

export function useUploadAgendaItems() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: uploadAgendaItems,
        isSuccess,
    } = useMutation({
        mutationFn: ({ file }: { file: File }) => {
            return fetchUploadAgendaItems(file);
        },

        onSuccess: (data) => queryClient.setQueryData(["agenda"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, uploadAgendaItems, isSuccess };
}
