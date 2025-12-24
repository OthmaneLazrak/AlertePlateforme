export interface AlertDetails {
    [key: string]: any
}


export interface Alert {
    id: number
    alertType?: string
    type?: string
    severity?: string
    timestamp?: string
    details: AlertDetails

    status?: "NEW" | "IN_PROGRESS" | "RESOLVED";
    assignedTo?: string; // username de l’analyste
    team: "DEV" | "SYSTEME" | "RESEAU";

}