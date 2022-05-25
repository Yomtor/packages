import { isNumber, isString } from 'lodash'
import createBreakpoints, { BreakpointsOptions } from './createBreakpoints'
import createPalette from './createPalete'
import { mergeObjects } from './utils'
import createSpacing from './createSpacing'
import { YomtorSizes } from '../constants'
import createRadius from './createRadius'
import { colorVariant, rgba, size } from './fns'
import { isColor, toRgba } from './utils/to-rgba'
import createSizes from './createSizes'
import createHeadings from './createHeadings'
import createTypography from './createTypography'
import createShadows from './createShadows'
import { YomtorTheme } from './types'

const generateVars = (params: any = {}): { [key: string]: string } => {
    const vars: { [key: string]: string } = {}
    Object.keys(params).forEach((property) => {
        let value = params[property].toString()

        if (isColor(value)) {
            const { r, g, b, a } = toRgba(value)

            value = `${r}, ${g}, ${b}${a !== 1 ? `, ${a}` : ''}`
        }

        vars[property] = value
    })

    return vars
}

const getVars = (tree: any, preffix = '-', replace = false) => {
    const leaves: any = {}
    const walk = (obj: any, path: any) => {
        path = path || ''
        for (var n in obj) {
            if (obj.hasOwnProperty(n)) {
                if (typeof obj[n] === 'object' || obj[n] instanceof Array) {
                    walk(obj[n], path + '-' + n)
                } else if (isString(obj[n]) || isNumber(obj[n])) {
                    leaves[path + '-' + n] = obj[n]

                    if (replace) {
                        let val = `var(${path + '-' + n})`
                        if (isColor(obj[n].toString())) {
                            const { r, g, b, a } = toRgba(obj[n])
                            val = (a === 1 && `rgb(${val})`) || `rgba(${val})`
                        }

                        obj[n] = val
                    }
                }
            }
        }
    }
    walk(tree, preffix)

    return leaves
}

export const getCssVars = (theme: Partial<YomtorTheme>) => {
    return generateVars({
        ...getVars(theme.palette, '-', true),
        ...getVars(theme.breakpoints.media),
        ...getVars(theme.typography),
        ...getVars({
            spacing: Object.keys(theme.spacing).reduce(
                (stack: { [key: string]: string }, current: string) => {
                    stack[current] = `${
                        theme.spacing[current as YomtorSizes]
                    }px`
                    return stack
                },
                {}
            )
        })
    })
}

export const createTheme = (
    options: Partial<YomtorTheme> = {}
): YomtorTheme => {
    const {
        palette: paletteInput = {},
        breakpoints: breakPointsInput = {},
        type: mode = 'light',
        typography: typographyInput = {},
        ...other
    } = options

    const palette = createPalette(mergeObjects(paletteInput, { mode }))
    const breakpoints = createBreakpoints(
        breakPointsInput as BreakpointsOptions
    )
    const spacing = createSpacing()
    const sizes = createSizes()
    const radius = createRadius()
    const headings = createHeadings()
    const shadows = createShadows()
    const typography = createTypography()

    const theme: Partial<YomtorTheme> = { vars: {} }

    Object.assign(
        theme,
        mergeObjects(
            {
                palette,
                breakpoints,
                shadows,
                spacing,
                sizes,
                radius,
                headings,
                typography,
                type: mode,
                fn: {
                    size,
                    rgba: rgba.bind(Object.assign({ vars: theme.vars })),
                    colorVariant: colorVariant.bind(theme),
                    getContrastText: palette.getContrastText.bind(theme),
                    augmentColor: palette.augmentColor
                }
            },
            other
        )
    )

    theme.vars = Object.assign(theme.vars, getCssVars(theme))

    return theme as YomtorTheme
}
