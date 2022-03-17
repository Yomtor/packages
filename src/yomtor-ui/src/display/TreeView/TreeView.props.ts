import { DefaultProps } from '@yomtor/styles'
import { TreeNodeData, TreeNodeProps } from './TreeNode/TreeNode.props'

export type TreeViewProps<T = any> = DefaultProps & {
    data?: TreeNodeData<T>[]
    nodeComponent?: React.FC<TreeNodeProps>
    nodeHeight?: number
    collapsed?: boolean
    highlightedProp?: string
    activedProp?: string
    collapsedProp?: string
}
