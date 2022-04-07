import { isArray, isUndefined } from 'lodash'
import { MouseEvent, useReducer } from 'react'
import { TreeNodeData } from './TreeNode/TreeNode.props'

type UseNodeTreeProps = {
    data: TreeNodeData[]
    collapsed?: boolean
    activedProp?: string
    collapsedProp?: string
}

export const useRecursive = ({
    data,
    collapsed,
    collapsedProp
}: UseNodeTreeProps) => {
    let index = -1

    const nodes: TreeNodeData[] = []
    const depths: number[] = []
    const parents: Record<number, TreeNodeData> = {}
    const previous: Record<number, TreeNodeData> = {}
    const next: Record<number, TreeNodeData> = {}

    const recursive = (
        data: TreeNodeData[] = [],
        depth = 0,
        parent?: TreeNodeData
    ) => {
        data.forEach((node, i) => {
            index++
            nodes[index] = node
            depths[index] = depth
            previous[index] = data[i - 1]
            next[index] = data[i + 1]

            if (parent) {
                parents[index] = parent
            }

            if (
                isArray(node.children) && !isUndefined(node[collapsedProp])
                    ? !node[collapsedProp]
                    : !collapsed
            ) {
                recursive(node.children, depth + 1, node)
            }
        })
    }
    recursive(data)
    return { nodes, depths, parents, next, previous }
}

export const useNodeTree = ({
    data,
    collapsed,
    collapsedProp
}: UseNodeTreeProps) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const collapser = (node: TreeNodeData, event: MouseEvent) => {
        node[collapsedProp] = !isUndefined(node[collapsedProp])
            ? !node[collapsedProp]
            : !collapsed

        event.stopPropagation()

        forceUpdate()
    }

    const { nodes, depths, parents, next, previous } = useRecursive({
        data,
        collapsed,
        collapsedProp
    })

    return { nodes, depths, parents, next, previous, collapser }
}
