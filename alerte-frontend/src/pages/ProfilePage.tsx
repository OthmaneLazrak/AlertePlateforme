import { Box, Avatar, Typography, Paper, Chip, Divider } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
    const { profile } = useAuth();

    if (!profile) {
        return (
            <Typography sx={{ color: "#9ca3af" }}>
                Chargement du profil...
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                p: 4,
                minHeight: "calc(100vh - 80px)",
                background: "linear-gradient(135deg, #020617, #020617)",
            }}
        >
            <Typography
                variant="h5"
                fontWeight={700}
                mb={4}
                sx={{ color: "#22d3ee", letterSpacing: 1 }}
            >
                 PROFIL OPÉRATEUR
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 4,
                    maxWidth: 520,
                    background: "linear-gradient(145deg, #0b1220, #020617)",
                    border: "1px solid rgba(34,211,238,0.25)",
                    boxShadow: "0 0 25px rgba(34,211,238,0.15)",
                }}
            >
                {/* Avatar */}
                <Box display="flex" alignItems="center" gap={3} mb={3}>
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: "#020617",
                            border: "2px solid #22d3ee",
                            color: "#22d3ee",
                            fontSize: 34,
                            fontWeight: 700,
                        }}
                    >
                        {profile.username[0].toUpperCase()}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: "#e5e7eb", fontWeight: 600 }}
                        >
                            {profile.username}
                        </Typography>

                        <Chip
                            icon={<SecurityIcon />}
                            label={
                                profile.roles.includes("ROLE_ADMIN")
                                    ? "ADMINISTRATEUR"
                                    : "ANALYSTE SÉCURITÉ"
                            }
                            sx={{
                                mt: 1,
                                bgcolor: "rgba(34,211,238,0.15)",
                                color: "#22d3ee",
                                border: "1px solid #22d3ee",
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(34,211,238,0.2)" }} />

                {/* Team */}
                <Box display="flex" alignItems="center" gap={2}>
                    <GroupsIcon sx={{ color: "#22d3ee" }} />
                    <Typography sx={{ color: "#e5e7eb" }}>
                        Équipe :
                        <Box
                            component="span"
                            sx={{
                                ml: 1,
                                fontWeight: 600,
                                color: "#22d3ee",
                            }}
                        >
                            {profile.team ?? "ADMIN"}
                        </Box>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
