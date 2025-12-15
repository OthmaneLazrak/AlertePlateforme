import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import StatsCard from "../components/StatCard.tsx";
import AlertChart from "../components/AlertChart.tsx";
import useAlertsWS from "../hooks/userAlertWS.ts";
import { useAlerts } from "../context/AlertContext.tsx";
import type { User } from "../types/User";

export default function Dashboard({ user }: { user: User }) {

    // ⚡ Correct : le hook doit être DANS le component
    const { alerts, addAlert } = useAlerts();

    const [dailyStats, setDailyStats] = useState<{ day: string; count: number }[]>([]);

    // --- Fonction mise à jour du graphe ---
    function addAlertToStats() {
        const day = new Date().toLocaleDateString("fr-FR");

        setDailyStats((prev) => {
            const existing = prev.find((d) => d.day === day);

            if (existing) {
                return prev.map((d) =>
                    d.day === day ? { ...d, count: d.count + 1 } : d
                );
            }

            return [...prev, { day, count: 1 }];
        });
    }

    // --- WebSocket : Réception alerte ---
    useAlertsWS(user.team, (alert) => {
        addAlert(alert);       // Ajout dans le contexte global
        addAlertToStats();     // Mise à jour du graphe
    });

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" fontWeight="bold" marginBottom={3}>
                Dashboard Alertes — Équipe {user.team}
            </Typography>

            {/* ----------------- KPIs ----------------- */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <StatsCard title="Alertes reçues" value={alerts.length} />
            </div>

            {/* ----------------- GRAPHE ----------------- */}
            <Paper sx={{ marginTop: 5, padding: 3, height: 350, borderRadius: 3 }}>
                <Typography variant="h6" marginBottom={2}>
                    Évolution des alertes par jour
                </Typography>

                <Box sx={{ width: "100%", height: "100%" }}>
                    <AlertChart data={dailyStats} />
                </Box>
            </Paper>
        </Box>
    );
}
