import { YomtorSizes } from '../constants'
import { mergeObjects } from './utils'

export type BreakpointDefaults = Record<YomtorSizes, boolean>
export type Breakpoint = keyof BreakpointDefaults
export type Methods = 'up' | 'down'

export type BreakpointValues = {
    // eslint-disable-next-line no-unused-vars
    [key in Breakpoint]: number
}

export interface Breakpoints {
    keys: Breakpoint[]
    values: BreakpointValues
    up: (key: Breakpoint | number) => string
    down: (key: Breakpoint | number) => string
    between: (start: Breakpoint | number, end: Breakpoint | number) => string
    only: (key: Breakpoint) => string
    width: (key: Breakpoint) => number
    media: { [key in Methods]: { [key in Breakpoint]: string } }
}

export type BreakpointsOptions = Partial<{
    unit: string
    step: number
}> &
    Breakpoints

export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl']

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints: BreakpointsOptions) {
    const {
        // The breakpoint **start** at this value.
        // For instance with the first breakpoint xs: [xs, sm).
        values = {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        },
        unit = 'px',
        step = 5,
        ...other
    } = breakpoints

    const keys = Object.keys(values) as Breakpoint[]

    function up(key: Breakpoint) {
        const value = typeof values[key] === 'number' ? values[key] : key
        return `@media (min-width:${value}${unit})`
    }

    function down(key: Breakpoint) {
        const value = typeof values[key] === 'number' ? values[key] : key
        return `@media (max-width:${+value - step / 100}${unit})`
    }

    function between(start: Breakpoint, end: Breakpoint) {
        const endIndex = keys.indexOf(end)

        return (
            `@media (min-width:${
                typeof values[start] === 'number' ? values[start] : start
            }${unit}) and ` +
            `(max-width:${
                +(endIndex !== -1 && typeof values[keys[endIndex]] === 'number'
                    ? values[keys[endIndex]]
                    : end) -
                step / 100
            }${unit})`
        )
    }

    function only(key: Breakpoint) {
        if (keys.indexOf(key) + 1 < keys.length) {
            return between(key, keys[keys.indexOf(key) + 1])
        }

        return up(key)
    }

    function width(key: Breakpoint) {
        return values[key]
    }

    const methods: { [key in Methods]: (key: Breakpoint) => string } = {
        up,
        down
    }
    const breaks: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']
    const media: any = {}

    ;(['up', 'down'] as Methods[]).forEach((method) => {
        breaks.forEach((bre) => {
            if (!media[method]) {
                media[method] = {}
            }
            media[method][bre] = methods[method](bre).replace(
                /@media\s*\((.*)\)/g,
                '$1'
            )
        })
    })

    return mergeObjects(
        {
            keys,
            values,
            up,
            down,
            between,
            only,
            width,
            unit,
            media
        },
        other
    )
}
