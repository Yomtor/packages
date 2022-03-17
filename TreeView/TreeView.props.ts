import { DraggableEventHandler } from 'react-draggable'
import { DropEvent } from '../../utils/Droppable/Droppable.props'

export type TreeViewPosition = 'in' | 'below' | 'above'

export type TreeNodeData<T = void> = {
    name: string
    children?: TreeNodeData<T>[]
    icon?: React.ReactNode
}

export type TreeViewProps<T = any> = {
    data: TreeNodeData<T>[]
    nodeComponent: React.FC<any>
    delay?: number
    collapsed?: boolean
    draggabled?: boolean
    sortabled?: boolean
    editabled?: boolean
    onSort?: (data?: {
        dragNode: T
        dropNode: T
        position: TreeViewPosition
    }) => void
    onDragStart?: DraggableEventHandler
    onDragStop?: DraggableEventHandler
    onDrag?: DraggableEventHandler
    onDrop?: (event?: DropEvent) => void

    onClick?: (data?: TreeNodeData<T>) => void

    iconFilter?: (data: TreeNodeData<T>) => React.ReactNode
    actionFilter?: (data: TreeNodeData<T>) => React.ReactNode
    labelFilter?: (data: TreeNodeData<T>) => React.ReactNode
}
