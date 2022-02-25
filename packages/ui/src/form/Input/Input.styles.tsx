import { createStyles } from '@yomtor/styles'
import { InputProps } from './Input.props'

type Classes = 'root'

export const InputStyles = createStyles<Classes, InputProps>((theme) => ({
    root: {
        border: 'none',
        width: '100%',
        outline: 'none',
        background: 'none',
        color: 'inherit',
        padding: 0,
        userSelect: 'none',
        fontFamily: theme.typography.fontFamily
    }
}))
