import { YomtorSizes } from '../constants'

export type SpacingOptions = Record<YomtorSizes, number>

export default function createSpacing(): SpacingOptions {
    return {
        xs: 10,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24
    }
}
