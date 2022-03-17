export type TreeNodeProps = {
    label: string
}

/*
import { MouseEvent } from 'react'
import { DraggableEventHandler } from 'react-draggable'
import { DropEvent } from '../../../utils/Droppable/Droppable.props'



export type TreeNodeData<T = unknown> = {
    name: string
    children?: TreeNodeData<T>[]
    icon?: React.ReactNode
    index?: number
    depth?: number
    collapsed?: boolean
    highlighted?: boolean
    actived?: boolean
    update?: (data?: TreeNodeData<T>) => void
} & T

export type TreeNodeEvent<T = unknown, E = MouseEvent> = {
    data: TreeNodeData<T>
    event: E
    update: () => void
} & T

export type TreeNodeEvents<T = unknown> = {
    iconFilter?: (
        data: TreeNodeData<T>,
        changed: (data?: TreeNodeEvent<T>[]) => void
    ) => React.ReactNode
    actionFilter?: (
        data: TreeNodeData<T>,
        changed: (data?: TreeNodeEvent<T>[]) => void
    ) => React.ReactNode
    labelFilter?: (
        data: TreeNodeData<T>,
        changed: (data?: TreeNodeEvent<T>[]) => void
    ) => React.ReactNode

    onClick?: (data?: TreeNodeEvent<T>) => void

    onDragStart?: DraggableEventHandler
    onDragStop?: DraggableEventHandler
    onDrag?: DraggableEventHandler
    onDrop?: (event?: DropEvent) => void

    editabled?: boolean
    parentUpdate?: (data: Partial<TreeNodeData<T>>) => void
    activedKey?: string
    highlightedKey?: string
    nameKey?: string
}

export type TreeNodeProps<T = any> = {
    depth?: number
    index?: number
    data: TreeNodeData<T>
    dropDisabled?: boolean
    draggabled?: boolean
    sortabled?: boolean
    classes?: { [key: string]: string }
} & TreeNodeEvents<T>
*/
