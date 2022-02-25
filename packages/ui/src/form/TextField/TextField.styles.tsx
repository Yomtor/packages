import { createStyles } from '@yomtor/styles'
import { prefix, root, suffix } from '../global.styles'
import { TextFieldProps } from './TextField.props'

type Classes = 'root' | 'prefix' | 'suffix'

export const TextFieldStyles = createStyles<Classes, TextFieldProps>(
    (theme, props) => ({
        root: {
            ...root(theme)
        },
        prefix: prefix(props),
        suffix: suffix(props)
    })
)
