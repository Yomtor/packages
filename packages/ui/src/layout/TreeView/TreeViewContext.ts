import { createContext } from 'react'
import { TreeNodeData } from './TreeNode/TreeNode.props'

export type TreeViewContextProps = {
    dropNode?: TreeNodeData
    dragNode?: TreeNodeData
    dragging?: boolean
    collapsed?: boolean
    position?: 'above' | 'below' | 'in'
    delay?: number
    count?: 0
}

export const TreeViewContext = createContext<TreeViewContextProps>({})
