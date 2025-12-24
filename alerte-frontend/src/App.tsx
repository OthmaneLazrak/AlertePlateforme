import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/AlertsPage";
import Layout from "./layouts/Layout";
import { AlertsProvider } from "./context/AlertContext";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";
import RegisterPage from "./pages/RegisterPage.tsx";
import MyAlertsPage from "./pages/MyAlertsPage.tsx";
import TeamMembersPage from "./pages/TeamMembersPage.tsx";

export default function App() {
    return (
        <AlertsProvider>
            <BrowserRouter>
                <Routes>

                    {/* 🔁 Racine → Login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* 🔓 Public */}
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/register" element={<RegisterPage />} />

                    {/* 🔐 Protégé */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/app" element={<Layout />}>

                            {/* ✅ /app */}
                            <Route index element={<Dashboard />} />

                            {/* ✅ /app/alertes */}
                            <Route path="alertes" element={<AlertsPage />} />

                            <Route path="mes-alertes" element={<MyAlertsPage />} />

                            <Route path="membres" element={<TeamMembersPage />} />


                            {/* ✅ /app/profil */}
                            <Route path="profil" element={<ProfilePage />} />






                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </AlertsProvider>
    );
}
