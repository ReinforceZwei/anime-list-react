
// https://zenoo.github.io/mui-theme-creator/
export const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#f9a825',
        },
        secondary: {
            main: '#546e7a',
        },
    },
    typography: {
        fontFamily: '"Noto Sans TC Variable", "Helvetica", "Arial", "sans-serif"'
    }
};


export const statusLightColorTheme = {
    status: {
        pending: 'palette.text.primary',
        inProgress: 'palette.text.primary',
        finished: '#ab1000',
        abandon: '#7e00de'
    },
    downloadStatus: {
        pending: 'palette.text.primary',
        inProgress: 'palette.text.primary',
        finished: '#00651a'
    }
}

export const statusDarkColorTheme = {
    status: {
        pending: 'palette.text.primary',
        inProgress: 'palette.text.primary',
        finished: '#c79b96',
        abandon: '#b98bdc'
    },
    downloadStatus: {
        pending: 'palette.text.primary',
        inProgress: 'palette.text.primary',
        finished: '#85b792'
    }
}