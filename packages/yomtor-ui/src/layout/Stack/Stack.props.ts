import { DefaultProps, YomtorSizes } from '@yomtor/styles'

export const YOMTOR_STACK_ALIGNS = [
    'stretch',
    'center',
    'flex-start',
    'flex-end'
] as const
export type YomtorStackAligns = typeof YOMTOR_STACK_ALIGNS[number]

export const YOMTOR_STACK_JUSTIFIES = [
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around'
] as const
export type YomtorStackJustifies = typeof YOMTOR_STACK_JUSTIFIES[number]

export type StackProps = DefaultProps & {
    spacing?: YomtorSizes
    align?: YomtorStackAligns
    justify?: YomtorStackJustifies
}
