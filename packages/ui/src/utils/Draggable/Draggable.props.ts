import { ReactElement } from 'react'
import { DraggableProps as ReactDraggableProps } from 'react-draggable'
export type { DraggableEvent, DraggableData } from 'react-draggable'

export type DraggableProps = Partial<ReactDraggableProps> & {
    phantom?: boolean
    move?: boolean
    data?: any
    disabled?: boolean
    throttle?: number
    start?: number
    children?: ReactElement
}
