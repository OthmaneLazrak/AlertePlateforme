import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Chip,
    Tooltip,
    Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import type { Alert } from "../types/Alert";
import { assignAlert } from "../api/alerts";
import { useAlerts } from "../context/AlertContext";
import { useAuth } from "../auth/AuthContext";

interface Props {
    alert: Alert;
    onDetails: (alert: Alert) => void;
    onResolve?: (alert: Alert) => void;
}

const severityColor = (severity?: string) => {
    switch (severity) {
        case "CRITICAL":
            return "#dc2626";
        case "HIGH":
            return "#f97316";
        case "MEDIUM":
            return "#eab308";
        default:
            return "#38bdf8";
    }
};

export default function AlertCard({ alert, onDetails, onResolve }: Props) {
    const { addOrUpdateAlert } = useAlerts(); // ✅ ICI
    const { user } = useAuth();

    const description =
        alert.details?.note ||
        alert.details?.message ||
        "Aucune description";

    const handleAssign = async () => {
        try {
            const res = await assignAlert(alert.id);
            addOrUpdateAlert(res.data); // ✅ OK
        } catch (e) {
            console.error("Impossible de prendre l’alerte", e);
        }
    };

    const isNew = alert.status === "NEW";
    const isInProgress = alert.status === "IN_PROGRESS";
    const isResolved = alert.status === "RESOLVED";

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                backgroundColor: "#020617",
                color: "#e5e7eb",
                borderLeft: `6px solid ${severityColor(alert.severity)}`,
                boxShadow: "0 0 0 1px #0f172a",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {/* CONTENT */}
                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
                    >
                        <NotificationsIcon
                            sx={{
                                fontSize: 20,
                                mr: 1,
                                color: severityColor(alert.severity),
                            }}
                        />
                        {alert.alertType}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#cbd5f5", mt: 0.5 }}>
                        {description}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                            ID : {alert.id}
                        </Typography>

                        {alert.severity && (
                            <Chip
                                label={alert.severity}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: 11,
                                    bgcolor: severityColor(alert.severity),
                                    color: "#020617",
                                }}
                            />
                        )}

                        {isInProgress && alert.assignedTo && (
                            <Chip
                                icon={<PersonIcon sx={{ fontSize: 14 }} />}
                                label={`Pris en charge par ${alert.assignedTo}`}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: 11,
                                    bgcolor: "#1e293b",
                                    color: "#38bdf8",
                                }}
                            />
                        )}

                        {isResolved && alert.assignedTo && (
                            <Chip
                                label={`✔ Terminée par ${alert.assignedTo}`}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: 11,
                                    bgcolor: "#22c55e",
                                    color: "#020617",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* ACTIONS */}
                <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end">
                    {isNew && (
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<PlayArrowIcon />}
                            onClick={handleAssign}
                            sx={{
                                bgcolor: "#dc2626",
                                fontSize: 11,
                                "&:hover": { bgcolor: "#b91c1c" },
                            }}
                        >
                            S’occuper
                        </Button>
                    )}

                    {isInProgress &&
                        alert.assignedTo === user?.sub &&
                        onResolve && (
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => onResolve(alert)}
                                sx={{
                                    bgcolor: "#22c55e",
                                    color: "#020617",
                                    fontSize: 11,
                                    "&:hover": { bgcolor: "#16a34a" },
                                }}
                            >
                                ✔ Terminer
                            </Button>
                        )}

                    <Tooltip title="Voir les détails">
                        <IconButton onClick={() => onDetails(alert)}>
                            <InfoIcon sx={{ color: "#38bdf8" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
}
