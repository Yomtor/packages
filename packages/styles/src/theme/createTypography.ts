import { YomtorSizes } from '../constants'

export type TypographyOptions = {
    fontFamily: string
    // fontWeight: number;
    lineHeight: number
    fontSizes: Record<YomtorSizes, number>
}

export default function createTypography(): TypographyOptions {
    return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        // fontWeight: 700,
        lineHeight: 1.55,
        fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20
        }
    }
}
