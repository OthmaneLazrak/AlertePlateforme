export interface AlertDetails {
    [key: string]: any
}


export interface Alert {
    id: string
    alertType?: string
    type?: string
    severity?: string
    timestamp?: string
    details: AlertDetails
}