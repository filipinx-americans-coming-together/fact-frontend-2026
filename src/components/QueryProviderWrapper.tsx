"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryProviderWrapper = ({ children }: { children: any }) => {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    staleTime: 15 * (60 * 1000), // 15 mins
                    gcTime: 20 * (60 * 1000), // 20 mins
                },
            },
        })
    );

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};
