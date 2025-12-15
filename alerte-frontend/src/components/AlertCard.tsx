import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsIcon from "@mui/icons-material/Notifications";
import type {Alert} from "../types/Alert";

interface Props {
    alert: Alert;
    onDetails: (alert: Alert) => void;
}

export default function AlertCard({ alert, onDetails }: Props) {
    const description =
        alert.details?.note ||
        alert.details?.message ||
        "Aucune description";

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: 2,
                borderLeft: "6px solid #4A6CF7",
            }}
        >
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        <NotificationsIcon
                            sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }}
                        />
                        {alert.alertType || alert.type}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1 }}
                    >
                        ID : {alert.id}
                    </Typography>
                </Box>

                <IconButton onClick={() => onDetails(alert)}>
                    <InfoIcon color="primary" />
                </IconButton>
            </CardContent>
        </Card>
    );
}
