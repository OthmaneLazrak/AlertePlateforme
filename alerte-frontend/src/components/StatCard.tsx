import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string;
    value: string | number;
}

export default function StatsCard({ title, value }: Props) {
    return (
        <Card sx={{ minWidth: 260, padding: 1, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}
