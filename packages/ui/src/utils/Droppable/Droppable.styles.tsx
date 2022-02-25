import { createStyles } from '@yomtor/styles'
import { DroppableProps } from './Droppable.props'

type Classes = 'root' | 'over' | 'dragging' | 'error'

export const DroppableStyles = createStyles<Classes, DroppableProps>(
    (theme) => ({
        root: {},
        dragging: {},
        over: {},
        error: {}
    })
)
