import { useCallback } from "react";

const useDownloadFile = (url: string, fileName: string) => {
    const downloadFile = useCallback(async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download error:", error);
        }
    }, [url]);

    return downloadFile;
};

export default useDownloadFile;
