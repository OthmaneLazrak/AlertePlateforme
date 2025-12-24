import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthContext";
import {CssBaseline, ThemeProvider} from "@mui/material";
import cyberTheme from "./theme/theme.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={cyberTheme}>
            <CssBaseline /> {/* reset + fond sombre */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
