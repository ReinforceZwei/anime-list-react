import { Box, Container, Fab, Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import DefaultLayout from "../layouts/defaultLayout"



export default function MainPage() {


    const body = <DefaultLayout />
    return (
        <>
        <Container maxWidth='false' sx={{maxWidth: '700px'}} disableGutters>
            <Paper elevation={5}>
                <Box padding={{sm: 6, xs: 2}}>
                {body}
                </Box>
            </Paper>

            
        </Container>
        <Box>
            <Fab sx={{position: 'fixed', right: 10, bottom: 10}} size="medium" color="secondary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
        </>
    )
}