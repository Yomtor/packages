import { YomtorSizes } from '../constants'

export type SizesOptions = {
    default: Record<YomtorSizes, number>
    icons: Record<YomtorSizes, number>
}

export default function createSizes(): SizesOptions {
    return {
        default: {
            xs: 12,
            sm: 14,
            md: 18,
            lg: 26,
            xl: 32
        },
        icons: {
            xs: 14,
            sm: 18,
            md: 24,
            lg: 30,
            xl: 34
        }
    }
}
