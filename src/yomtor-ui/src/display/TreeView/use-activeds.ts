import { TreeNodeData } from './TreeNode/TreeNode.props'
import { isArray } from 'lodash'
import { DependencyList, useMemo } from 'react'

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
    deps: DependencyList
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

    const activeds = useMemo(() => nodes.reduce(reducer, []), deps)
    const parentActiveds = useMemo(() => parents, deps)

    return { activeds, parentActiveds }
}
