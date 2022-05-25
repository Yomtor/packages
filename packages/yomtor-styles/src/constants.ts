export const YOMTOR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type YomtorSizes = typeof YOMTOR_SIZES[number] | number

export const YOMTOR_COLORS = [
    'primary',
    'secondary',
    'warning',
    'info',
    'error'
] as const
export type YomtorColors = typeof YOMTOR_COLORS[number]

export const Yomtor_LEVELS = [
    'lightest',
    'light',
    'main',
    'strong',
    'strongest'
] as const
export type YomtorLevels = typeof Yomtor_LEVELS[number]

export const YOMTOR_VARIANTS = [
    'filled',
    'transparent',
    'hover',
    'light',
    'outline',
    'default',
    'white',
    'gradient',
    'subtle'
] as const
export type YomtorVariants = typeof YOMTOR_VARIANTS[number]

export type YomtorGradient = { from: string; to: string; deg: number }
