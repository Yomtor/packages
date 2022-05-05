import { createTheme, ThemeOptions } from '@material-ui/core/styles'

export type ThemeConfig = {
    darkMode?: boolean
}

const Theme = (config?: ThemeConfig) => {
    const theme: ThemeOptions = createTheme({
        palette: {
            primary: {
                main: '#ff6900'
            },
            secondary: {
                main: '#332500'
            },
            type: config.darkMode ? 'dark' : 'light'
        }
    })

    const { breakpoints } = theme

    theme.overrides = {
        MuiToolbar: {
            regular: {
                minHeight: 50,
                [breakpoints.up('sm')]: {
                    minHeight: 50
                }
            }
        },
        MuiAppBar: {
            root: {
                borderBottom: `1px solid ${theme.palette.divider}`
            }
        },
        MuiDrawer: {}
    }

    return theme
}

export default Theme
