import { createStyles } from '@yomtor/styles'
import { DraggableProps } from './Draggable.props'

type Classes = 'phantom' | 'handler'

type DraggableStyeProps = DraggableProps & {
    dragging: boolean
    animated: boolean
}

export const DraggableStyles = createStyles<Classes, DraggableStyeProps>(
    (theme, { dragging, animated, move, phantom, disabled }) => {
        return {
            phantom: {
                pointerEvents: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10
            },
            handler: {
                transform: 'none !important',
                pointerEvents:
                    (move && (dragging || animated) && 'none') || 'all',
                opacity: move && !phantom && (animated || dragging) && 0,
                userSelect: !disabled ? 'none' : null
            }
        }
    }
)
