import { API_URL } from "@/util/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUploadFacilitatorEmails(file: File): Promise<{message: string, failed: string[]}> {
    const formData = new FormData();
    formData.append("emails", file);

    // request
    const response = await fetch(`${API_URL}/fact-admin/accounts/send-facilitator-links/`, {
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

    console.log(json)

    return {
        message: json.message,
        failed: json.failed,
    }
}

export function useUploadFacilitatorEmails() {
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isPending,
        mutate: uploadFacilitatorEmails,
        isSuccess,
    } = useMutation({
        mutationFn: ({ file }: { file: File }) => {
            return fetchUploadFacilitatorEmails(file);
        },

        // onSuccess: (data) => queryClient.setQueryData(["workshops"], data),
    });

    console.log("isSuccess", isSuccess);

    return { data, error, isPending, uploadFacilitatorEmails, isSuccess };
}