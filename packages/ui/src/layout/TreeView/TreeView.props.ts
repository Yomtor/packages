import { DraggableEventHandler } from 'react-draggable'
import { TreeNodeData, TreeNodeEvents } from './TreeNode/TreeNode.props'

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
        position: 'above' | 'below' | 'in'
    }) => void
    onDrop?: (data?: { node: T }) => void
    onDragStart?: DraggableEventHandler
    onDragStop?: DraggableEventHandler
    onDrag?: DraggableEventHandler
} & TreeNodeEvents<T>
