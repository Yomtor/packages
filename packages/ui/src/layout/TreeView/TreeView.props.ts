import { DraggableEventHandler } from 'react-draggable'
import { DropEvent } from '../../utils/Droppable/Droppable.props'
import { TreeNodeData, TreeNodeEvents } from './TreeNode/TreeNode.props'

export type TreeViewPosition = 'in' | 'below' | 'above'

export type TreeViewProps<T = any> = {
    data: TreeNodeData<T>[]
    nodeComponent: React.FC<any>
    delay?: number
    collapsed?: boolean
    draggabled?: boolean
    sortabled?: boolean
    onSort?: (data?: {
        dragNode: T
        dropNode: T
        position: TreeViewPosition
    }) => void
    onDragStart?: DraggableEventHandler
    onDragStop?: DraggableEventHandler
    onDrag?: DraggableEventHandler
    onDrop?: (event?: DropEvent) => void
} & TreeNodeEvents<T>
