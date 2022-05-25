import { createStyles } from '@yomtor/styles'
import { ButtonFieldProps } from './ButtonField.props'

type Classes = 'root'

export const ButtonFieldStyles = createStyles<Classes, ButtonFieldProps>(
    (theme) => ({
        root: {
            background: theme.palette.background.main,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderRadius: theme.radius.xs,
            color: theme.palette.text.main,
            overflow: 'hidden',
            minHeight: 22,
            cursor: 'pointer'
        }
    })
)
