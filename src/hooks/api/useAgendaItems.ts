import { API_URL } from "@/util/constants";
import { AgendaItemData, ResponseData } from "@/util/types";
import { useQuery } from "@tanstack/react-query";
// import agenda from "./agenda.json"

async function fetchAgendaItems(): Promise<AgendaItemData[]> {
    let json;
    
    if (API_URL.length === 0) {
        json = await fetch('./static-data/agenda.json').then(r=>r.json());
    }
    else {
        const response = await fetch(`${API_URL}/fact-admin/agenda-items/`);
        
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
    

    const agendaItems: AgendaItemData[] = json.map(
        (
            item: ResponseData<{
                title: string;
                start_time: string;
                end_time: string;
                building: string | undefined;
                room_num: string | undefined;
                session_num: number | undefined;
            }>
        ) => {
            return {
                id: item.pk,
                title: item.fields.title,
                start_time: new Date(item.fields.start_time),
                end_time: new Date(item.fields.end_time),
                building: item.fields.building,
                room_num: item.fields.room_num,
                session_num: item.fields.session_num,
            };
        }
    );

    return agendaItems;
}

export function useAgendaItems(): {
    agendaItems: AgendaItemData[] | undefined;
    isLoading: boolean;
    error: Error | null;
} {
    const {
        data: agendaItems,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["agenda"],
        queryFn: () => fetchAgendaItems(),
        retry: 0,
    });

    return { agendaItems, isLoading, error };
}
