"use client";

import { useNotifications } from "@/hooks/api/useNotifications";
import Notification from "./Notification";
import { useEffect, useState } from "react";

export default function NotificationsManager({
    notifications,
}: {
    notifications: string[];
}) {
    const [currNotif, setCurrNotif] = useState(0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    function handleCloseNotif() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }

        setCurrNotif(currNotif + 1);
    }

    useEffect(() => {
        if (currNotif < notifications.length) {
            const timeoutId = setTimeout(() => {
                setCurrNotif(currNotif + 1);
            }, 6000);

            setTimeoutId(timeoutId);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [currNotif, notifications]);

    if (currNotif >= notifications.length) {
        return <></>;
    }

    return (
        <Notification
            key={currNotif}
            text={notifications[currNotif]}
            setClose={handleCloseNotif}
        />
    );
}