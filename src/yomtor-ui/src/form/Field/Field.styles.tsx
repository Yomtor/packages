import { createStyles } from '@yomtor/styles'

import { FieldProps } from './Field.props'

type Classes = 'root' | 'label' | 'wrapper'

export const FieldStyles = createStyles<Classes, FieldProps>(
    (_, { position, align }) => ({
        root: {
            display: 'flex',
            flexDirection: position === 'above' ? 'column' : 'column-reverse'
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: align
        },
        label: {
            transform: 'none !important'
        }
    })
)
