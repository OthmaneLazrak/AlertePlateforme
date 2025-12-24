import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Button,
    Chip,
    Box,
    Typography
} from "@mui/material";
import type { Alert } from "../types/Alert";

interface Props {
    open: boolean;
    onClose: () => void;
    alert: Alert | null;
}

const severityColor = (severity?: string) => {
    switch (severity) {
        case "CRITICAL": return "error";
        case "HIGH": return "warning";
        case "MEDIUM": return "info";
        default: return "default";
    }
};

export default function AlertDetailsModal({ open, onClose, alert }: Props) {
    if (!alert) return null;

    const details = alert.details || {};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    borderRadius: 3,
                    border: "1px solid #0f172a",
                },
            }}
        >
            {/* HEADER */}
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700}>
                         {alert.alertType}
                    </Typography>

                    <Chip
                        label={alert.severity}
                        color={severityColor(alert.severity)}
                        size="small"
                    />
                </Box>
            </DialogTitle>

            {/* CONTENT */}
            <DialogContent>
                <Typography
                    variant="caption"
                    sx={{ color: "#94a3b8", mb: 2, display: "block" }}
                >
                    ID : {alert.id}
                </Typography>

                <List dense>
                    {Object.keys(details).length === 0 && (
                        <ListItem>
                            <ListItemText primary="Aucun détail disponible" />
                        </ListItem>
                    )}

                    {Object.entries(details).map(([key, value]) => (
                        <ListItem
                            key={key}
                            sx={{
                                backgroundColor: "#020617",
                                borderBottom: "1px solid #0f172a",
                            }}
                        >
                            <ListItemText
                                primary={key}
                                secondary={String(value)}
                                primaryTypographyProps={{ color: "#38bdf8", fontWeight: 600 }}
                                secondaryTypographyProps={{ color: "#cbd5f5" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>

            {/* ACTIONS */}
            <DialogActions sx={{ borderTop: "1px solid #0f172a" }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="error"
                >
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
}
