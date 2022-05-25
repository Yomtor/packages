import { DefaultProps } from '@yomtor/styles'
import { TreeNodeData } from '../TreeView/TreeNode/TreeNode.props'

type TreeObjectNodeData = {
    label?: string
    visible?: boolean
    locked?: boolean
}

export type TreeObjectProps = DefaultProps & {
    node: TreeNodeData<TreeObjectNodeData>
}
