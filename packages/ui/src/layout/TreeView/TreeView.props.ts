import { DefaultProps } from '@yomtor/styles'
import { TreeNodeData } from './TreeNode/TreeNode.props'

export type TreeViewProps<T = any> = DefaultProps & {
    data?: TreeNodeData<T>[]
    nodeComponent?: React.FC
    nodeHeight?: number
    collapsed?: boolean
}
