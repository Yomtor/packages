import { createStyles } from '@yomtor/styles'
import { DraggableProps } from './Draggable.props'

type Classes = 'root' | 'phantom' | 'handler'

type DraggableStyeProps = DraggableProps & { dragging: boolean }

export const DraggableStyles = createStyles<Classes, DraggableStyeProps>(
    (theme, { dragging, move, phantom }) => ({
        root: {
            position: 'relative'
        },
        phantom: {
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0
        },
        handler: {
            transform: (phantom || !move) && 'none !important',
            transition: !dragging && 'transform .3s ease-in-out',
            pointerEvents: (dragging && 'none') || 'all'
        }
    })
)
