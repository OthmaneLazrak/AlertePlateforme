import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Paper,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { register as registerApi } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";

export default function RegisterPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [team, setTeam] = useState<"DEV" | "SYSTEME" | "RESEAU">("DEV");
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/app" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await registerApi({ username, password, team });
            await login(res.access_token);
            navigate("/app", { replace: true });
        } catch {
            setError("Erreur lors de l'inscription");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at top, #020617, #000)",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    width: 420,
                    borderRadius: 3,
                    backgroundColor: "#020617",
                    boxShadow: "0 0 0 1px #0f172a",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={800}
                    mb={1}
                    color="#e5e7eb"
                >
                     Create Secure Account
                </Typography>

                <Typography
                    variant="body2"
                    color="#94a3b8"
                    mb={3}
                >
                    Cyber Alert Monitoring Platform
                </Typography>

                {error && (
                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    {/* USERNAME */}
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        sx={{
                            input: { color: "#e5e7eb" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#1e293b" },
                                "&:hover fieldset": { borderColor: "#38bdf8" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#38bdf8",
                                },
                            },
                        }}
                    />

                    {/* PASSWORD */}
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        sx={{
                            input: { color: "#e5e7eb" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#1e293b" },
                                "&:hover fieldset": { borderColor: "#38bdf8" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#38bdf8",
                                },
                            },
                        }}
                    />

                    {/* TEAM */}
                    <TextField
                        select
                        fullWidth
                        label="Équipe"
                        margin="normal"
                        value={team}
                        onChange={(e) =>
                            setTeam(e.target.value as any)
                        }
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        sx={{
                            color: "#e5e7eb",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#1e293b" },
                                "&:hover fieldset": { borderColor: "#38bdf8" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#38bdf8",
                                },
                            },
                        }}
                    >
                        <MenuItem value="DEV"> DEV</MenuItem>
                        <MenuItem value="SYSTEME"> SYSTEME</MenuItem>
                        <MenuItem value="RESEAU"> RESEAU</MenuItem>
                    </TextField>

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.2,
                            fontWeight: 700,
                            background:
                                "linear-gradient(90deg, #ef4444, #dc2626)",
                        }}
                    >
                        Créer le compte
                    </Button>
                </form>

                <Button
                    fullWidth
                    sx={{
                        mt: 2,
                        color: "#38bdf8",
                        textTransform: "none",
                    }}
                    onClick={() => navigate("/login")}
                >
                    Déjà un compte ? Se connecter
                </Button>
            </Paper>
        </Box>
    );
}
