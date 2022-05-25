import { BreakpointsOptions } from '../createBreakpoints'
import { HeadingOptions } from '../createHeadings'
import { YomtorPalette, YomtorPaletteColor } from '../createPalete'
import { RadiusOptions } from '../createRadius'
import { ShadowOptions } from '../createShadows'
import { SizesOptions } from '../createSizes'
import { SpacingOptions } from '../createSpacing'
import { TypographyOptions } from '../createTypography'
import { rgba, Size, YomtorColorVariant } from '../fns'

export type Modes = 'light' | 'dark'

export type YomtorTheme = {
    palette: YomtorPalette
    breakpoints: BreakpointsOptions
    type: Modes
    shadows: ShadowOptions
    spacing: SpacingOptions
    sizes: SizesOptions
    radius: RadiusOptions
    debug: boolean
    headings: HeadingOptions
    typography: TypographyOptions
    vars: { [key: string]: string }
    fn: {
        size: Size
        rgba: typeof rgba
        colorVariant: YomtorColorVariant
        getContrastText?: (
            background: string,
            contrastThreshold?: number
        ) => string
        augmentColor?: (
            color: YomtorPaletteColor | string,
            tonalOffset?: number,
            contrastThreshold?: number
        ) => YomtorPaletteColor
    }
}
