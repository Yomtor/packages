import React from 'react'

import { ThemeProvider as ThemeProviderJss } from 'react-jss'
import createTheme from './styles/createTheme'

type Props = {
    theme?: {}
}

export const ThemeProvider: React.FC<Props> = ({ children, theme }) => {
    return <ThemeProviderJss theme={theme || {}}>{children}</ThemeProviderJss>
}

ThemeProvider.defaultProps = {
    theme: createTheme()
}
