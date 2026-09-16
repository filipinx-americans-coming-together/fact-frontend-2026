import { API_URL } from "@/util/constants";
import fetchWithCredentials from "@/util/fetchWithCredentials";
import { ResponseData, WorkshopData } from "@/util/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUploadWorkshops(file: File): Promise<WorkshopData[]> {
    const formData = new FormData();
    formData.append("workshops", file);

    // request
    const response = await fetchWithCredentials({
        url: `${API_URL}/registration/workshops/bulk/`,
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

export function useUploadWorkshops() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: uploadWorkshops,
        isSuccess,
    } = useMutation({
        mutationFn: ({ file }: { file: File }) => {
            return fetchUploadWorkshops(file);
        },

        onSuccess: (data) => queryClient.setQueryData(["workshops"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, uploadWorkshops, isSuccess };
}
