import axiosClient from "./axiosClient";

export interface AlerteRequestDTO {
    id: string;
    timestamp: string; // ISO string
    alert_type: string;
    severity: string;
    details: Record<string, any>;
}

export const sendAlert = (data: AlerteRequestDTO) =>
    axiosClient.post("/api/alertes", data);
