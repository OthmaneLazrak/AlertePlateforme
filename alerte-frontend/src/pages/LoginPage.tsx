import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { login as loginApi } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/app" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await loginApi(username, password);
            await login(res.access_token);
            navigate("/app", { replace: true });
        } catch {
            setError("Identifiants invalides");
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
                    width: 400,
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
                     Secure Access
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

                    <TextField
                        fullWidth
                        label="Mot de passe"
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
                        Connexion
                    </Button>
                </form>

                <Button
                    fullWidth
                    sx={{
                        mt: 2,
                        color: "#38bdf8",
                        textTransform: "none",
                    }}
                    onClick={() => navigate("/register")}
                >
                    Créer un compte
                </Button>
            </Paper>
        </Box>
    );
}
