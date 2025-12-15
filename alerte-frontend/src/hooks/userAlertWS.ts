import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import type { Alert } from "../types/Alert";

export default function useAlertsWS(team: string, onAlert: (a: Alert) => void) {

    useEffect(() => {
        if (!team) return;

        const socket = new SockJS("/ws-alerts");
        const stomp = Stomp.over(socket);
        stomp.debug = () => {};

        stomp.connect({}, () => {
            const topic = `/topic/team/${team}`;

            console.log("📡 Listening on:", topic);

            stomp.subscribe(topic, msg => {
                const alert: Alert = JSON.parse(msg.body);
                onAlert(alert);
            });
        });

        return () => {
            try { stomp.disconnect(); } catch {}
        };

    }, [team]);
}
