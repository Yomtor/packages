import {
    DefaultProps,
    PolymorphicComponentProps,
    YomtorColors,
    YomtorSizes
} from '@yomtor/styles'

export type ButtonVariant =
    | 'filled'
    | 'outline'
    | 'light'
    | 'gradient'
    | 'white'
    | 'default'
    | 'subtle'

type Props = DefaultProps & {
    size?: YomtorSizes
    type?: 'submit' | 'button' | 'reset'
    color?: YomtorColors
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
    radius?: YomtorSizes
    variant?: ButtonVariant
    uppercase?: boolean
    compact?: boolean
    loading?: boolean
    disabled?: boolean
    hoverOpacity?: number
}

export type ButtonProps<C = 'button'> = PolymorphicComponentProps<C, Props>

export type ButtonComponent = (<C = 'button'>(
    props: ButtonProps<C>
) => React.ReactElement) &
    React.ForwardRefExoticComponent<ButtonProps<any>>

/* & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>
*/
