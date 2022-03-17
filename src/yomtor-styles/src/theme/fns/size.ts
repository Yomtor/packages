import { isNumber } from 'lodash'
import { YomtorSizes } from '../../constants'

export type Size = (args: {
    size: YomtorSizes | number
    sizes: Record<YomtorSizes, any>
}) => number

export const size = (args: {
    size: YomtorSizes | number
    sizes: Record<YomtorSizes, any>
}) => {
    if (!isNaN(+args.size)) {
        return +args.size
    }

    return args.sizes[args.size] || args.size || args.sizes.md
}
