import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {Outlet, useLocation} from "react-router-dom";

export default function Layout() {

    const location = useLocation();

    const pageTitles: Record<string, string> = {
        "/": "Dashboard",
        "/alertes": "Alertes récentes",
        "/profil": "Profil utilisateur"
    };

    const title = pageTitles[location.pathname] || "Application";


    return (
        <Box sx={{ display: "flex" }}>

            <Sidebar />

            {/* Contenu principal, décalé d'exactement la largeur du sidebar */}
            <Box sx={{ flexGrow: 1, ml: "240px" }}>
                {/* TOPBAR DYNAMIQUE */}
                <Topbar title={title} />


                <Box sx={{ mt: "70px", p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
