import { YomtorSizes } from '../constants'

export type RadiusOptions = Record<YomtorSizes, number>

export default function createRadius(): RadiusOptions {
    return {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 16,
        xl: 32
    }
}
