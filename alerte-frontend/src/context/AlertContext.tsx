import { createContext, useContext, useState } from "react";
import type { Alert } from "../types/Alert";

interface AlertsContextType {
    alerts: Alert[];
    addAlert: (a: Alert) => void;
}

const AlertContext = createContext<AlertsContextType | null>(null);

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    function addAlert(a: Alert) {
        setAlerts(prev => [a, ...prev]);
    }

    return (
        <AlertContext.Provider value={{ alerts, addAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlerts() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlerts must be used inside AlertsProvider");
    return ctx;
}
