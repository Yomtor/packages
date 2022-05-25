import { createStyles } from '@yomtor/styles'
import { ButtonProps } from './Button.props'

type Classes = 'root' | 'hover' | 'content'

export const ButtonStyles = createStyles<
    Classes,
    ButtonProps & { hovered: boolean }
>((theme, { fullWidth, hovered, hoverOpacity }) => {
    console.log(hoverOpacity, theme.palette.divider)
    return {
        root: {
            minHeight: 22,
            cursor: 'pointer',
            position: 'relative',
            border: 'none',
            width: fullWidth && '100%',
            outline: 'none',
            background: 'none',
            color: 'inherit',
            userSelect: 'none',
            height: 'inherit',
            fontSize: 'inherit',
            display: fullWidth ? 'flex' : 'inline-flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: 0,
            opacity: 1
        },
        content: {
            display: 'flex',
            position: 'relative'
        },
        hover: {
            borderRadius: 'inherit',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            pointerEvents: 'none',
            transition: 'background 0.2s ease-in-out',
            background:
                hovered && theme.fn.rgba(theme.palette.divider, hoverOpacity)
        }
    }
})
