import { isArray, isFunction } from 'lodash'
import { Sx, useYomtorTheme, YomtorTheme } from '../theme'
import { useCss } from './use-css'

function extract(sx: Sx, theme: YomtorTheme) {
    return isFunction(sx) ? sx(theme) : sx
}

export const useSx = (sx: Sx | Sx[], className: string) => {
    const theme = useYomtorTheme()
    const { css, cx } = useCss()

    if (isArray(sx)) {
        return cx(
            className,
            sx.map((item) => css(extract(item, theme)))
        )
    }

    return cx(className, css(extract(sx, theme)))
}
