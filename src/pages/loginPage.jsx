import { useContext, useEffect, useMemo, useState } from "react"
import pb, { USER_COL } from "../services/pocketbase"
import { Alert, Box, Button, ButtonGroup, Container, CssBaseline, Divider, Paper, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import Grid from "@mui/material/Unstable_Grid2"
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/userSlice"

export default function LoginPage() {
    const dispatch = useDispatch()
    const [authMethods, setAuthMethods] = useState([])
    const [loginError, setLoginError] = useState('')
    
    const { handleSubmit, reset, setValue, setFocus, control } = useForm()

    useEffect(() => {
        let getAuthMethods = async () => {
            let methods = await pb.collection(USER_COL).listAuthMethods()
            setAuthMethods(methods.authProviders)
        }
        getAuthMethods()
    }, [])

    const handleLogin = ({ username, password }) => {
        pb.collection('users').authWithPassword(username, password)
        .then(authData => {
            dispatch(loginSuccess())
        })
        .catch(err => {
            console.log(err)
            setLoginError(err?.message || 'Unknown error')
        })
    }

    const handleOauth = (providerName) => {
        let w = window.open()
        pb.collection('users').authWithOAuth2({
            provider: providerName,
            urlCallback: (url) => {
                w.location.href = url
            },
        })
        .then(authData => {
            dispatch(loginSuccess())
        })
        .catch(err => {
            console.log(err)
            setLoginError(err?.message || 'Unknown error')
        })
    }

    const getProviderIcon = (name) => {
        switch (name) {
            case 'github': return <GitHubIcon />
            case 'apple': return <AppleIcon />
            case 'google': return <GoogleIcon />
            case 'microsoft': return <MicrosoftIcon />
            case 'facebook': return <FacebookIcon />
            default: return <LanguageIcon />
        }
    }

    console.log('Loading Page Rendered')

    return (
        <div>
            <CssBaseline />
            <Container maxWidth='sm' sx={{mt: 5}}>
                <Paper sx={{ margin: 2, padding: 2 }}>
                    <Box mb={1}>
                        <Typography variant="h4">Anime List</Typography>
                        <Typography variant="subtitle1">動漫列表</Typography>
                    </Box>
                    
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Controller
                                    render={({ field: { onBlur, onChange, ref, value, name, disabled } }) => (
                                        <TextField
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            inputRef={ref}
                                            value={value}
                                            name={name}
                                            disabled={disabled}
                                            label='登入名稱'
                                            fullWidth
                                        />
                                    )}
                                    name='username'
                                    rules={{ required: true }}
                                    control={control}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Controller
                                    render={({ field: { onBlur, onChange, ref, value, name, disabled } }) => (
                                        <TextField
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            inputRef={ref}
                                            value={value}
                                            name={name}
                                            disabled={disabled}
                                            label='密碼'
                                            type='password'
                                            fullWidth
                                        />
                                    )}
                                    name='password'
                                    rules={{ required: true }}
                                    control={control}
                                />
                            </Grid>
                            <Grid xs={12} sx={{textAlign: 'center'}}>
                                <Button type='submit' variant="outlined">登入</Button>
                            </Grid>
                            {loginError && (
                                <Grid xs={12}>
                                    <Alert severity="error">登入失敗: {loginError}</Alert>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Paper>
                { !!authMethods?.length && (
                    <>
                    <Divider>或</Divider>
                    { authMethods.map((method) => (
                        <Box textAlign='center' mt={1}>
                            <ButtonGroup orientation="vertical" variant="outlined" size="large">
                                <Button variant="outlined" startIcon={getProviderIcon(method.name)} onClick={() => handleOauth(method.name)}>使用 {method.displayName} 登入</Button>
                            </ButtonGroup>
                        </Box>
                    )) }
                    
                    </>
                ) }
                
            </Container>
        </div>
    )
}