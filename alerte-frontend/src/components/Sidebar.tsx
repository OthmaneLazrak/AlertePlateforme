import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                background: "#2c3e50",
                color: "white",
                position: "fixed",
                left: 0,
                top: 0,
                paddingTop: 3,
                boxShadow: 3,
            }}
        >
            <List>

                {/* Dashboard */}
                <ListItemButton
                    component={Link}
                    to="/"
                    selected={location.pathname === "/"}
                >
                    <ListItemIcon sx={{ color: "white" }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {/* Alertes */}
                <ListItemButton
                    component={Link}
                    to="/alertes"
                    selected={location.pathname === "/alertes"}
                >
                    <ListItemIcon sx={{ color: "white" }}>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alertes" />
                </ListItemButton>

                {/* Profil */}
                <ListItemButton
                    component={Link}
                    to="/profil"
                    selected={location.pathname === "/profil"}
                >
                    <ListItemIcon sx={{ color: "white" }}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profil" />
                </ListItemButton>

            </List>
        </Box>
    );
}
