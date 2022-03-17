import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { YomtorProvider, createTheme, YomtorTheme } from '@yomtor/styles'

export const Container: React.FC = ({ children }) => {
    const darkMode = useDarkMode()
    const theme = { type: darkMode ? 'dark' : 'light' } as YomtorTheme

    return (
        <YomtorProvider theme={theme}>
            <div>{children}</div>
        </YomtorProvider>
    )
}
