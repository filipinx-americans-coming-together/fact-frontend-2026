"use client";

import { useNotifications } from "@/hooks/api/useNotifications";
import Notification from "./Notification";
import { useState } from "react";

export default function NotificationsManager({
    notifications,
}: {
    notifications: string[];
}) {
    const [currNotif, setCurrNotif] = useState(0);

    function handleCloseNotif() {
        setCurrNotif(currNotif + 1);
    }

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