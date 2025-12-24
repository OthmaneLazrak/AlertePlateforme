import { resolveAlert } from "../api/alerts";
import { useAlerts } from "../context/AlertContext";
import { useAuth } from "../auth/AuthContext";
import AlertCard from "../components/AlertCard.tsx";
import type {Alert} from "../types/Alert.ts";

export default function MyAlertsPage() {
    const { alerts, updateAlert } = useAlerts();
    const { user } = useAuth();

    if (!user) return null;

    const myAlerts = alerts.filter(
        a => a.assignedTo === user.sub && a.status !== "RESOLVED"
    );

    async function handleResolve(a: Alert) {
        try {
            const res = await resolveAlert(a.id);
            updateAlert(res.data); // 🔄 synchro globale
        } catch {

        }
    }

    return (
        <>
            {myAlerts.map(alert => (
                <AlertCard
                    key={alert.id}
                    alert={alert}
                    currentUser={user.sub}
                    onResolve={handleResolve}
                    onDetails={() => {}}
                />
            ))}
        </>
    );
}
