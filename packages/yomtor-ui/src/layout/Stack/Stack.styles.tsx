import { createStyles } from '@yomtor/styles'
import { StackProps } from './Stack.props'

type Classes = 'root'

export const StackStyles = createStyles<Classes, StackProps>(
    (theme, { align, justify, spacing }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: align,
            justifyContent: justify,
            gap: theme.fn.size({ size: spacing, sizes: theme.spacing })
        }
    })
)
