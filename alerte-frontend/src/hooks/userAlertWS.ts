import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { Alert } from "../types/Alert";

export default function useAlertsWS(
    team?: string,
    onMessage?: (alert: Alert) => void
) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!team) return;

        const client = new Client({
            webSocketFactory: () =>
                new SockJS("http://localhost:8084/ws-alerts"),
            reconnectDelay: 5000,
            debug: () => {},
        });

        client.onConnect = () => {
            console.log("🟢 WS connected for team", team);

            client.subscribe(`/topic/team/${team}`, msg => {
                try {
                    const alert: Alert = JSON.parse(msg.body);
                    onMessage?.(alert);
                } catch (e) {
                    console.error("WS parse error", e);
                }
            });
        };

        client.activate();
        clientRef.current = client;

        return () => {
            console.log("🔴 WS disconnected");
            client.deactivate();
            clientRef.current = null;
        };
    }, [team]); // 🔥 onMessage retiré volontairement
}
