import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/AlertsPage";
import Layout from "./layouts/Layout";

import { AlertsProvider } from "./context/AlertContext";
import ProfilePage from "./pages/ProfilePage.tsx"; // ✅ IMPORT IMPORTANT

export default function App() {
    const user = { id: 1, prenom: "Othmane", nom: "Lazrek", team: "RESEAU" }; // Mocked user data

    return (
        <AlertsProvider>   {/* ✅ CONTEXTE GLOBAL */}

            <BrowserRouter>
                <Routes>

                    {/* Layout parent */}
                    <Route path="/" element={<Layout />}>

                        <Route index element={<Dashboard user={user} />} />
                        <Route path="alertes" element={<AlertsPage user={user} />} />
                        <Route path="profil" element={<ProfilePage user={user} />} />


                    </Route>

                </Routes>
            </BrowserRouter>

        </AlertsProvider>
    );
}
