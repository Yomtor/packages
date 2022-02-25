import { TypographyOptions } from './createTypography'

export type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingOptions = {
    fontFamily: string
    fontWeight: number
    sizes: {
        [key in Headings]: { fontSize: number; lineHeight: number }
    }
}

export default function createHeadings(): HeadingOptions {
    return {
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 500,
        sizes: {
            h1: { fontSize: 24, lineHeight: 1.3 },
            h2: { fontSize: 20, lineHeight: 1.35 },
            h3: { fontSize: 18, lineHeight: 1.4 },
            h4: { fontSize: 16, lineHeight: 1.45 },
            h5: { fontSize: 14, lineHeight: 1.5 },
            h6: { fontSize: 12, lineHeight: 1.5 }
        }
    }
}
