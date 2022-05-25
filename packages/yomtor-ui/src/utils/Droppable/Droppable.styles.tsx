import { createStyles } from '@yomtor/styles'
import { DroppableProps } from './Droppable.props'

type Classes = 'root' | 'over' | 'dragging' | 'error'

export const DroppableStyles = createStyles<Classes, DroppableProps>(
    (_, { disabled }) => ({
        root: {
            display: 'unset',
            userSelect: !disabled ? 'none' : null
        },
        dragging: {},
        over: {},
        error: {}
    })
)
