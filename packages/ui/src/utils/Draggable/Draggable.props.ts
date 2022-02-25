import { DraggableProps as ReactDraggableProps } from 'react-draggable'

export type DraggableProps = Partial<ReactDraggableProps> & {
    phantom?: boolean
    move?: boolean
    data?: any
    disabled?: boolean
}
