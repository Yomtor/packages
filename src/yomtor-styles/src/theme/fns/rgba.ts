import { toRgba } from '../utils/to-rgba'

export function rgba(
    this: { [key: string]: any },
    color: string,
    alpha?: number
) {
    alpha = alpha || 1

    if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
        return 'rgba(0, 0, 0, 1)'
    }

    if (color.startsWith('rgb(var(--')) {
        return color.replace(/(rgb)\((var\(--.*\))\)/g, `$1a($2, ${alpha})`)
    }

    if (color.startsWith('rgba(var(--')) {
        color = `rgba(${
            this.vars[color.replace(/rgba\(var\((.*)\)\)/g, '$1')]
        })`
    }

    const { r, g, b } = toRgba(color)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
