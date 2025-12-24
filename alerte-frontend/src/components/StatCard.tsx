import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
    title: string;
    value: string | number;
    color?: string; // optionnel pour différencier les KPI
}

export default function StatsCard({ title, value, color = "#38bdf8" }: Props) {
    return (
        <Card
            sx={{
                minWidth: 260,
                borderRadius: 3,
                backgroundColor: "#020617",
                color: "#e5e7eb",
                boxShadow: "0 0 0 1px #0f172a",
                transition: "0.2s",
                "&:hover": {
                    boxShadow: `0 0 0 1px ${color}`,
                },
            }}
        >
            <CardContent>
                <Typography
                    variant="caption"
                    sx={{
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color,
                        }}
                    >
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
