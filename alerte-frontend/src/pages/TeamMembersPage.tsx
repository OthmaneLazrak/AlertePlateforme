import { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { fetchTeamMembers } from "../api/team";

interface TeamMember {
    id: number;
    username: string;
    role: string;
}

export default function TeamMembersPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        fetchTeamMembers().then(res => setMembers(res.data));
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h5"
                fontWeight={700}
                mb={4}
                color="#22d3ee"
            >
                 Membres de l’équipe
            </Typography>

            {members.map(member => (
                <Paper
                    key={member.id}
                    sx={{
                        p: 2,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        background: "#020617",
                        borderRadius: 3,
                        boxShadow: "0 0 0 1px #0f172a",
                    }}
                >
                    <GroupIcon sx={{ color: "#38bdf8" }} />

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ fontWeight: 600, color: "#e5e7eb" }}>
                            {member.username}
                        </Typography>

                        <Chip
                            label={member.role || "Analyste"}
                            size="small"
                            sx={{
                                mt: 0.5,
                                bgcolor: "#1e293b",
                                color: "#38bdf8",
                            }}
                        />
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}
