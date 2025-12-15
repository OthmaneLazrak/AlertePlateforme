import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Topbar({ title }: { title: string }) {
    return (
        <AppBar
            position="fixed"
            sx={{ ml: "240px", width: "calc(100% - 240px)", background: "white", color: "#344767", boxShadow: 2 }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    {title}
                </Typography>

                <Box>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
