import { DefaultProps, PolymorphicComponentProps } from '@yomtor/styles'

type Props = DefaultProps

export type BoxProps<C> = PolymorphicComponentProps<C, Props>

export type BoxComponent = (<C = 'div'>(
    props: BoxProps<C>
) => React.ReactElement) & {
    displayName?: string
}
