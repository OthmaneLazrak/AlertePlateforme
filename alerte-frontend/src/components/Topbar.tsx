import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Topbar({ title }: { title: string }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                height: 64,
                left: 240,                 // 🔥 aligné au sidebar
                width: "calc(100% - 240px)",
                background: "#020617",
                color: "#e5e7eb",
                borderBottom: "1px solid #0f172a",
                boxShadow: "none",
            }}
        >



        <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                    {title}
                </Typography>

                <Box>
                    <Tooltip title="Notifications">
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Déconnexion">
                        <IconButton color="error" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
