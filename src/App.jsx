import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { CssBaseline } from '@mui/material';
import { loginSuccess, selectLoggedIn } from './redux/userSlice'
import pb, { USER_COL } from './services/pocketbase'
import LoginPage from './pages/loginPage'
import DefaultLayout from './layouts/defaultLayout'
import { themeOptions, statusLightColorTheme, statusDarkColorTheme } from './themes.js';
import MainPage from './pages/MainPage.jsx';

function App() {
    const dispatch = useDispatch()
    const reduxLoggedIn = useSelector(selectLoggedIn)
    const loggedIn = reduxLoggedIn || pb?.authStore?.isValid

    useEffect(() => {
        if (!reduxLoggedIn && pb?.authStore?.isValid) {
            dispatch(loginSuccess())
        }
    }, [])

    const colorMode = 'system' // TODO: from user settings
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    const mode = colorMode === 'system' ? prefersDarkMode : colorMode
    const statusColor = mode == 'light' ? statusLightColorTheme : statusDarkColorTheme
    const theme = useMemo(
        () =>
            createTheme(deepmerge(themeOptions, {
                palette: {
                    mode: mode,
                },
                ...statusColor,
            })),
        [prefersDarkMode, colorMode],
    );

    const body = loggedIn ? <MainPage /> : loggedIn === undefined ? <div>Loading</div> : <LoginPage />

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {body}
            </ThemeProvider>
        </div>
    )
}

export default App
