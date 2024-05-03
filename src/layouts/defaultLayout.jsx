import { Box, Container, Paper, Typography } from "@mui/material";
import AnimeList from "../components/AnimeList/AnimeList";



export default function DefaultLayout() {

    return (
        <Box>
            <Typography variant="h3" align="center">Anime List</Typography>
            <AnimeList title="Watched" filter="status = 'finished'" sort="+finish_time" />
            <AnimeList title="To Watch" filter="status = 'pending'" sort="+created" />
        </Box>
    )
}