import { DefaultProps } from '@yomtor/styles'
import { TreeNodeData, TreeNodeProps } from './TreeNode/TreeNode.props'

export type TreeViewPositions = 'below' | 'above' | 'in'

export type TreeViewProps<T = any> = DefaultProps & {
    data?: TreeNodeData<T>[]
    nodeComponent?: React.FC<TreeNodeProps>
    nodeHeight?: number
    collapsed?: boolean
    highlightedProp?: string
    activedProp?: string
    collapsedProp?: string
    indentWitdh?: number
    sortable?: boolean
    draggable?: boolean
}
