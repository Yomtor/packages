import { YomtorTheme } from '../types'
import {
    YomtorColors,
    YomtorVariants,
    YomtorGradient,
    YOMTOR_COLORS
} from '../../constants'

type ColorVariants = {
    color?: YomtorColors
    variant: YomtorVariants
    gradient?: YomtorGradient
}

type Colors = {
    border?: string
    background?: string
    color?: string
    hover?: Colors
}

export type YomtorColorVariant = (variants: ColorVariants) => Colors

const DEFAULT_GRADIENT = {
    from: 'primary',
    to: 'secondary',
    deg: 45
}

export function colorVariant(
    this: Partial<YomtorTheme>,
    { color = 'primary', variant = 'filled', gradient }: ColorVariants
): Colors {
    if (variant === 'light') {
        return {
            border: 'transparent',
            background: this.fn.rgba(this.palette[color].lightest, 0.8),
            color: this.palette[color].main,
            hover: {
                border: undefined,
                color: undefined,
                background: this.fn.rgba(this.palette[color].lightest, 0.8)
            }
        }
    }

    if (variant === 'white') {
        return {
            border: 'transparent',
            background: this.palette.background.darkest,
            color: this.fn.rgba(this.palette.text.main, 0.4),
            hover: {
                border: undefined,
                color: undefined,
                background: undefined
            }
        }
    }

    if (variant === 'transparent') {
        return {
            border: 'transparent',
            background: 'transparent',
            color: this.palette[color].main,
            hover: {
                border: undefined,
                color: this.palette[color].light,
                background: undefined
            }
        }
    }

    if (variant === 'gradient') {
        const merged = {
            from: gradient?.from || DEFAULT_GRADIENT.from,
            to: gradient?.to || DEFAULT_GRADIENT.to,
            deg: gradient?.deg || DEFAULT_GRADIENT.deg
        }

        if (!(merged.from in YOMTOR_COLORS) || !(merged.to in YOMTOR_COLORS)) {
            return null
        }

        return {
            background: `linear-gradient(${merged.deg}deg, ${
                this.palette[merged.from as YomtorColors].main
            } 0%, ${this.palette[merged.to as YomtorColors].main} 100%)`,
            color: this.palette.white,
            border: 'transparent',
            hover: null
        }
    }

    if (variant === 'hover') {
        return {
            border: 'transparent',
            background: 'transparent',
            color: this.palette[color].main,
            hover: {
                border: undefined,
                color: this.palette[color].light,
                background: this.fn.rgba(this.palette.background.lightest, 0.8)
            }
        }
    }

    if (variant === 'outline') {
        return {
            border: this.palette[color].main,
            background: 'transparent',
            color: this.palette[color].main,
            hover: {
                border: this.palette[color].light,
                background: undefined,
                color: this.palette[color].light
            }
        }
    }

    if (variant === 'default') {
        return {
            border: 'transparent',
            background: this.palette.background.light,
            color: this.fn.rgba(this.palette.text.main, 0.4),
            hover: {
                border: undefined,
                color: this.palette[color].text,
                background: this.palette[color].main
            }
        }
    }

    return {
        border: 'transparent',
        background: this.palette[color].main,
        color: this.palette[color].text,
        hover: {
            border: undefined,
            color: undefined,
            background: this.palette[color].light
        }
    }
}
