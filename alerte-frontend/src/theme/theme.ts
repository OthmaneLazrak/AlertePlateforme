import { createTheme } from "@mui/material/styles";

const cyberTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#22d3ee", // cyan cyber
        },
        secondary: {
            main: "#ef4444", // rouge alerte
        },
        background: {
            default: "#020617", // fond global
            paper: "#020617",
        },
        text: {
            primary: "#e5e7eb",
            secondary: "#94a3b8",
        },
    },
    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        h5: {
            fontWeight: 700,
        },
    },
});

export default cyberTheme;
