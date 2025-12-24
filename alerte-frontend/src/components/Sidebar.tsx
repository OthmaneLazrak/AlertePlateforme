import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const menu = [
        { label: "Dashboard", icon: <DashboardIcon />, path: "/app" },
        { label: "Alertes", icon: <NotificationsIcon />, path: "/app/alertes" },
        { label: "Mes alertes", icon: <AssignmentIndIcon />, path: "/app/mes-alertes" },
        { label: "Membres d'équipe", icon: <GroupIcon />, path: "/app/membres" },
        { label: "Profil", icon: <PersonIcon />, path: "/app/profil" },
    ];


    const isActive = (path: string) =>
        location.pathname === path ||
        location.pathname.startsWith(path + "/");

    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                background: "linear-gradient(180deg, #020617, #020617)",
                color: "#e5e7eb",
                position: "fixed",
                left: 0,
                top: 0,
                boxShadow: "inset -1px 0 0 #0f172a",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ===== LOGO / TITLE ===== */}
            <Typography
                variant="h6"
                sx={{
                    px: 2,
                    py: 2.5,
                    fontWeight: 800,
                    color: "#22d3ee",
                    letterSpacing: 1,
                }}
            >
                 Alerte Platform
            </Typography>

            <Divider sx={{ borderColor: "#0f172a", mb: 1 }} />

            {/* ===== MENU ===== */}
            <List sx={{ px: 1 }}>
                {menu.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={Link}
                        to={item.path}
                        selected={isActive(item.path)}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            "&.Mui-selected": {
                                backgroundColor: "#334155",
                                boxShadow: "inset 2px 0 0 #22d3ee",
                            },
                            "&:hover": {
                                backgroundColor: "#334155",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "#cbd5f5", minWidth: 36 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: isActive(item.path) ? 600 : 400,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
