import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 240;
const TOPBAR_HEIGHT = 64;

export default function Layout() {
    const location = useLocation();

    const pageTitles: Record<string, string> = {
        "/app": "Dashboard",
        "/app/alertes": "Alertes de sécurité",
        "/app/profil": "Profil utilisateur",
    };

    const title = pageTitles[location.pathname] || "Cyber Alert Platform";

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "background.default", // 🔥 thème global
            }}
        >
            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENU PRINCIPAL */}
            <Box
                sx={{
                    flexGrow: 1,
                    ml: `${SIDEBAR_WIDTH}px`,
                }}
            >
                {/* TOPBAR */}
                <Topbar title={title} />

                {/* CONTENU */}
                <Box
                    sx={{
                        mt: `${TOPBAR_HEIGHT + 16}px`,
                        px: 4,
                        pb: 4,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
