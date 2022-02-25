export type ButtonProps = {
    fullWidth?: boolean
    hovered?: boolean
    hoverOpacity?: number
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>
