import { Box, Typography, Paper, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

import type { Alert } from "../types/Alert";
import AlertDetailsModal from "../components/AlertDetailsModal";
import { useAlerts } from "../context/AlertContext";
import useAlertsWS from "../hooks/userAlertWS";
import type { User } from "../types/User";

interface AlertsPageProps {
    user: User;  // ⚠️ On passe tout l'user pour accéder à user.team
}

export default function AlertsPage({ user }: AlertsPageProps) {

    // 📌 On récupère les alertes globales
    const { alerts, addAlert } = useAlerts();

    // 📌 On écoute les WebSockets pour l’équipe du user
    useAlertsWS(user.team, addAlert);

    const [selected, setSelected] = useState<Alert | null>(null);

    return (
        <Box sx={{ width: "100%", p: 0, pr: 0 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
                Alertes récentes — Équipe {user.team}
            </Typography>

            {alerts.length === 0 && (
                <Typography color="text.secondary" sx={{ mt: 4 }}>
                    Aucune alerte reçue.
                </Typography>
            )}

            {alerts.map((a) => (
                <Paper
                    key={a.id}
                    sx={{
                        p: 2,
                        mb: 2,
                        borderLeft: "6px solid #ff5252",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        boxShadow: 2,
                        width: "100%",
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{a.alertType}</Typography>

                        <Typography color="text.secondary">
                            {a.details?.message || a.details?.note}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            ID: {a.id}
                        </Typography>
                    </Box>

                    <IconButton onClick={() => setSelected(a)}>
                        <InfoIcon color="primary" />
                    </IconButton>
                </Paper>
            ))}

            <AlertDetailsModal
                open={selected !== null}
                alert={selected}
                onClose={() => setSelected(null)}
            />
        </Box>
    );
}
