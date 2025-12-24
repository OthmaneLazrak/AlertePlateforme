import { Box, Typography, Paper } from "@mui/material";
import StatsCard from "../components/StatCard";
import AlertChart from "../components/AlertChart";
import { useAlerts } from "../context/AlertContext";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    const { alerts } = useAlerts();

    if (!user?.team) return null;

    // 📊 stats calculées depuis le state global
    const dailyStats = Object.values(
        alerts.reduce((acc, alert) => {
            const day = new Date(alert.timestamp).toLocaleDateString("fr-FR");
            acc[day] = acc[day]
                ? { day, count: acc[day].count + 1 }
                : { day, count: 1 };
            return acc;
        }, {} as Record<string, { day: string; count: number }>)
    );

    return (
        <Box sx={{ px: 2 }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#e5e7eb", mb: 4 }}
            >
                Security Dashboard — Équipe {user.team}
            </Typography>

            {/* KPIs */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 3,
                }}
            >
                <StatsCard
                    title="Alertes reçues"
                    value={alerts.length}
                    color="#ef4444"
                />
                <StatsCard
                    title="Équipe surveillée"
                    value={user.team}
                    color="#38bdf8"
                />
            </Box>

            {/* GRAPH */}
            <Paper
                sx={{
                    mt: 5,
                    p: 3,
                    height: 360,
                    borderRadius: 3,
                    backgroundColor: "#020617",
                    boxShadow: "0 0 0 1px #0f172a",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "#e5e7eb", fontWeight: 600 }}
                >
                    Évolution des alertes (journalier)
                </Typography>

                <Box sx={{ width: "100%", height: 260 }}>
                    <AlertChart data={dailyStats} />
                </Box>
            </Paper>

            {/* ALERTES EN COURS */}
            <Box mt={5}>
                <Typography
                    variant="h6"
                    sx={{ color: "#22d3ee", mb: 2, fontWeight: 700 }}
                >
                    Alertes en cours (équipe)
                </Typography>

                {alerts.filter(a => a.status === "IN_PROGRESS").length === 0 && (
                    <Typography sx={{ color: "#9ca3af" }}>
                        Aucune alerte en cours.
                    </Typography>
                )}

                {alerts
                    .filter(a => a.status === "IN_PROGRESS")
                    .map(a => (
                        <Paper
                            key={a.id}
                            sx={{
                                p: 2,
                                mb: 1.5,
                                backgroundColor: "#020617",
                                borderLeft: "4px solid #38bdf8",
                            }}
                        >
                            <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                                {a.alertType}
                            </Typography>
                            <Typography sx={{ color: "#38bdf8", fontSize: 14 }}>
                                Pris en charge par {a.assignedTo}
                            </Typography>
                        </Paper>
                    ))}
            </Box>
        </Box>
    );
}
