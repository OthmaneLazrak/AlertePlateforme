import axiosClient from "./axiosClient";
import type { Alert } from "../types/Alert";


export interface AlerteRequestDTO {
    id: string;
    timestamp: string; // ISO string
    alert_type: string;
    severity: string;
    details: Record<string, any>;
}

export const sendAlert = (data: AlerteRequestDTO) =>
    axiosClient.post("/api/alertes", data);

export const assignAlert = (id: string) =>
    axiosClient.put(`/api/alertes/${id}/assign`);

export const fetchInProgressAlerts = async (): Promise<Alert[]> => {
    const res = await axiosClient.get("/api/alertes/in-progress");
    return res.data;
};

export const resolveAlert = (id: number) =>
    axiosClient.put(`/api/alertes/${id}/resolve`);
export const fetchTeamAlerts = async (): Promise<Alert[]> => {
    const res = await axiosClient.get("/api/alertes/team");
    return res.data;
};

