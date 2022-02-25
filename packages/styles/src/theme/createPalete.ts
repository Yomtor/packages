import { isString } from 'lodash'
import { YomtorTheme } from './types'
import { YomtorLevels } from '../constants'
import { getContrastRatio, lighten, darken } from './colorManipulation'
import { common, grey, orange, red, green, blue, cyan } from './colors'
import { mergeObjects } from './utils'

export let dark: YomtorPalette
export let light: YomtorPalette

export type YomtorPaletteColor = {
    lightest: string
    light: string
    main: string
    strong: string
    strongest: string
    text: string
}

export type TypeAction = {
    active?: string
    hover?: string
    hoverOpacity?: number
    selected?: string
    selectedOpacity?: number
    disabled?: string
    disabledOpacity?: number
    disabledBackground?: string
    focus?: string
    focusOpacity?: number
    activatedOpacity?: number
}
export type TypeBackground = {
    default?: string
    paper?: string
}

export type TypeDivider = string

export type TypeText = {
    main?: string
    disabled?: string
    icon?: string
}

export type YomtorPalette = {
    primary?: YomtorPaletteColor
    secondary?: YomtorPaletteColor
    error?: YomtorPaletteColor
    warning?: YomtorPaletteColor
    info?: YomtorPaletteColor
    success?: YomtorPaletteColor
    mode?: 'light' | 'dark'
    contrastThreshold?: number
    tonalOffset?: number
    divider?: TypeDivider
    action?: TypeAction
    logo?: YomtorPaletteColor
    white?: string
    black?: string
    text?: Record<YomtorLevels, string>
    background?: Record<YomtorLevels, string>
    getContrastText?: (background: string, contrastThreshold?: number) => string
    augmentColor?: (
        color: YomtorPaletteColor | string,
        tonalOffset?: number,
        contrastThreshold?: number
    ) => YomtorPaletteColor
}

export type YomtorColor = {
    color?: YomtorPaletteColor
    name?: string
}

function addLightOrDark(
    intent: YomtorPaletteColor,
    direction: keyof YomtorPaletteColor,
    tonalOffset: any
) {
    const tonalOffsetLight = tonalOffset.light || tonalOffset
    const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5

    if (!intent[direction]) {
        if (direction === 'lightest') {
            intent.lightest = lighten(intent.main, 0.8)
        } else if (direction === 'light') {
            intent.light = lighten(intent.main, tonalOffsetLight)
        } else if (direction === 'strong') {
            intent.strong = darken(intent.main, tonalOffsetDark)
        } else if (direction === 'strongest') {
            intent.strongest = darken(intent.main, 0.8)
        }
    }
}

export function getContrastText(
    this: YomtorTheme,
    background: string,
    contrastThreshold = 2
) {
    const color = background.replace(/rgba?\(var\((.*)\)\)$/g, '$1')

    if (this.vars && this.vars[color]) {
        background = `rgba(${this.vars[color]})`
    }
    const contrastText =
        getContrastRatio(background, dark.text?.main || '') >= contrastThreshold
            ? dark.text?.main
            : light.text?.main

    return contrastText
}

export const augmentColor = (
    color: any,
    tonalOffset = 0.2,
    contrastThreshold = 2
): YomtorPaletteColor => {
    color = isString(color) ? { main: color } : { ...color }

    addLightOrDark(color, 'lightest', tonalOffset)
    addLightOrDark(color, 'light', tonalOffset)
    addLightOrDark(color, 'strong', tonalOffset)
    addLightOrDark(color, 'strongest', tonalOffset)

    if (!color.text && dark && light) {
        color.text = getContrastText.bind(null)(color.main, contrastThreshold)
    }

    return color
}

light = {
    logo: augmentColor('#008146'),
    text: {
        lightest: '#414141',
        light: '#414141',
        main: '#242424',
        dark: '#242424',
        darkest: '#FFFFF'
    },
    background: {
        lightest: '#E3E3E3',
        light: '#F2F2F2',
        main: '#EEEEEE',
        dark: '#FFFFFF',
        darkest: '#FFFFFF'
    },
    divider: '#E3E3E3',
    action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12
    }
}

dark = {
    logo: augmentColor('#FFFFFF'),
    text: {
        lightest: '#E3E3E3',
        light: '#E3E3E3',
        main: '#E3E3E3',
        dark: '#F2F2F2',
        darkest: '#B6B6B6'
    },
    background: {
        lightest: '#3A3941',
        light: '#2B2A30',
        main: '#242329',
        dark: '#1F1E24',
        darkest: '#16151A'
    },
    secondary: {
        lightest: grey[20],
        light: grey[40],
        main: grey[60],
        strong: grey[80],
        strongest: grey[100],
        text: '#E3E3E3'
    },
    divider: '#373737',
    action: {
        active: common.white,
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24
    }
}

export default function createPalette(palette: YomtorPalette): YomtorPalette {
    const {
        primary = cyan,
        secondary = grey,
        error = red,
        warning = orange,
        info = blue,
        success = green,
        white = common.white,
        black = common.black,
        mode = 'light',
        contrastThreshold = 2,
        tonalOffset = 0.2,
        ...other
    } = palette

    const modes = { dark, light }

    const paletteOutput = mergeObjects(
        {
            common,
            mode,
            primary: augmentColor(primary, tonalOffset, contrastThreshold),
            secondary: augmentColor(secondary, tonalOffset, contrastThreshold),
            error: augmentColor(error, tonalOffset, contrastThreshold),
            warning: augmentColor(warning, tonalOffset, contrastThreshold),
            info: augmentColor(info, tonalOffset, contrastThreshold),
            success: augmentColor(success, tonalOffset, contrastThreshold),
            grey: augmentColor(grey, tonalOffset, contrastThreshold),
            contrastThreshold,
            getContrastText,
            augmentColor,
            tonalOffset
        },
        modes[mode],
        other
    )

    return paletteOutput
}
