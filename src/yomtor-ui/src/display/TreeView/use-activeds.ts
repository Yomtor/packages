import { TreeNodeData } from './TreeNode/TreeNode.props'
import { isArray } from 'lodash'
import { useMemo } from 'react'

const getChildrens = (nodes: TreeNodeData[], children: TreeNodeData[] = []) => {
    nodes.forEach((node) => {
        children.push(node)
        if (isArray(node.children)) {
            getChildrens(node.children, children)
        }
    })

    return children
}

export const useActiveds = (
    nodes: TreeNodeData[],
    actived = 'actived',
    forced = 0
) => {
    const parents: TreeNodeData[] = []

    const reducer = (stack: TreeNodeData[], current: TreeNodeData) => {
        if (current[actived]) {
            stack.push(current)

            if (isArray(current.children)) {
                getChildrens(current.children, parents)
            }
        }
        return stack
    }

    const activeds = useMemo(() => nodes.reduce(reducer, []), [forced])
    const parentActiveds = useMemo(() => parents, [forced])

    return { activeds, parentActiveds }
}
