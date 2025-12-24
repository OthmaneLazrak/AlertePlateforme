import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Alert } from "../types/Alert";
import { useAuth } from "../auth/AuthContext";
import useAlertsWS from "../hooks/userAlertWS";
import { fetchInProgressAlerts } from "../api/alerts";

interface AlertsContextType {
    alerts: Alert[];
    addOrUpdateAlert: (alert: Alert) => void;
}

const AlertContext = createContext<AlertsContextType | null>(null);

export function AlertsProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loaded, setLoaded] = useState(false);

    /* =====================================
       1️⃣ CHARGEMENT INITIAL (HTTP – refresh)
    ====================================== */
    useEffect(() => {
        if (!user?.team || loaded) return;

        console.log("📡 Chargement initial des alertes (HTTP)");

        fetchInProgressAlerts()
            .then(data => {
                setAlerts(data);
                setLoaded(true);
            })
            .catch(err => {
                console.error("❌ fetchInProgressAlerts", err);
                setLoaded(true); // éviter blocage
            });
    }, [user?.team, loaded]);

    /* =====================================
       2️⃣ TEMPS RÉEL (WebSocket)
    ====================================== */
    useAlertsWS(user?.team, incoming => {
        setAlerts(prev => {
            const exists = prev.find(a => a.id === incoming.id);
            return exists
                ? prev.map(a => (a.id === incoming.id ? incoming : a))
                : [incoming, ...prev];
        });
    });

    /* =====================================
       3️⃣ API PUBLIQUE POUR L’UI
    ====================================== */
    function addOrUpdateAlert(alert: Alert) {
        setAlerts(prev => {
            const exists = prev.find(a => a.id === alert.id);
            return exists
                ? prev.map(a => (a.id === alert.id ? alert : a))
                : [alert, ...prev];
        });
    }

    return (
        <AlertContext.Provider
            value={{
                alerts,
                addOrUpdateAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
}

export function useAlerts() {
    const ctx = useContext(AlertContext);
    if (!ctx) {
        throw new Error("useAlerts must be used inside AlertsProvider");
    }
    return ctx;
}
