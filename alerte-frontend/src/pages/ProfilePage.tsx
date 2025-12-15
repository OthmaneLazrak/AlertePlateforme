import { Box, Avatar, Typography, Paper, Button } from "@mui/material";

interface ProfilePageProps {
    user: {
        prenom: string;
        nom: string;
        email?: string;
        role?: string;
    };
}

export default function ProfilePage({ user }: ProfilePageProps) {
    return (
        <Box sx={{ mt: 10, ml: "250px", p: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
                👤 Profil utilisateur
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 500,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        width: 90,
                        height: 90,
                        mb: 2,
                        bgcolor: "#3f51b5",
                        fontSize: 32,
                    }}
                >
                    {user.prenom[0]}
                </Avatar>

                <Typography variant="h6" fontWeight={600}>
                    {user.prenom} {user.nom}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                    {user.email || "email@domaine.com"}
                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        bgcolor: "#e3eafc",
                        color: "#3f51b5",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 14,
                    }}
                >
                    {user.role || "Administrateur"}
                </Typography>

                <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                    Modifier le profil
                </Button>
            </Paper>
        </Box>
    );
}
