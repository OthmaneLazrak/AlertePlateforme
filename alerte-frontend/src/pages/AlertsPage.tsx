import { Box, Typography } from "@mui/material";
import { useState } from "react";
import type { Alert } from "../types/Alert";
import AlertDetailsModal from "../components/AlertDetailsModal";
import AlertCard from "../components/AlertCard";
import { useAlerts } from "../context/AlertContext";
import { useAuth } from "../auth/AuthContext";

export default function AlertsPage() {
    const { user } = useAuth();
    const { alerts } = useAlerts();

    if (!user?.team) return null;

    const [selected, setSelected] = useState<Alert | null>(null);

    return (
        <Box
            sx={{
                p: 4,
                minHeight: "calc(100vh - 80px)",
                background: "#020617",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: "#22d3ee",
                    letterSpacing: 1,
                }}
            >
                CENTRE D’ALERTES — ÉQUIPE {user.team}
            </Typography>

            {alerts.length === 0 && (
                <Typography sx={{ color: "#9ca3af", mt: 4 }}>
                    Aucune alerte détectée.
                </Typography>
            )}

            {alerts.map(alert => (
                <AlertCard
                    key={alert.id}
                    alert={alert}
                    onDetails={setSelected}
                />
            ))}

            <AlertDetailsModal
                open={Boolean(selected)}
                alert={selected}
                onClose={() => setSelected(null)}
            />
        </Box>
    );
}
