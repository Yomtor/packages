import { isArray, isUndefined } from 'lodash'
import { MouseEvent, useReducer } from 'react'
import { TreeNodeData } from './TreeNode/TreeNode.props'
import { TreeViewPositions } from './TreeView.props'

type UseNodeTreeProps = {
    data: TreeNodeData[]
    collapsed?: boolean
    position?: TreeViewPositions
    propsName?: { active?: string; collapse?: string; highlight?: string }
    dragIndex?: number
}

export const useRecursive = ({
    data,
    collapsed,
    position,
    propsName: { active, collapse, highlight },
    dragIndex
}: UseNodeTreeProps) => {
    let index = -1
    const nodes: TreeNodeData[] = []
    const depths: number[] = []
    const parents: Record<number, TreeNodeData> = {}
    const previous: Record<number, TreeNodeData> = {}
    const next: Record<number, TreeNodeData> = {}
    const activeds: Record<number, TreeNodeData> = {}
    const childActiveds: Record<number, TreeNodeData> = {}
    const highlighteds: Record<number, TreeNodeData> = {}
    const disableDrops: Record<number, TreeNodeData> = {}

    const recursive = (
        data: TreeNodeData[] = [],
        depth = 0,
        parent?: TreeNodeData,
        actived?: boolean,
        disableDrop?: boolean
    ) => {
        data.forEach((node, i) => {
            index++
            nodes[index] = node
            depths[index] = depth
            previous[index] = data[i - 1]
            next[index] = data[i + 1]

            if (node[active]) {
                activeds[index] = node
            }
            if (actived) {
                childActiveds[index] = node
            }
            if (disableDrop) {
                disableDrops[index] = node
            }

            if (
                node[highlight] &&
                !node[active] &&
                !['below', 'above'].includes(position)
            ) {
                highlighteds[index] = node
            }

            if (parent) {
                parents[index] = parent
            }

            if (
                isArray(node.children) && !isUndefined(node[collapse])
                    ? !node[collapse]
                    : !collapsed
            ) {
                recursive(
                    node.children,
                    depth + 1,
                    node,
                    actived || node[active],
                    disableDrop || index === dragIndex
                )
            }
        })
    }
    recursive(data)

    return {
        nodes,
        depths,
        parents,
        activeds,
        childActiveds,
        highlighteds,
        next,
        previous,
        disableDrops
    }
}

export const useNodeTree = ({
    data,
    collapsed,
    position,
    propsName: { collapse, ...others },
    dragIndex
}: UseNodeTreeProps) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const collapser = (node: TreeNodeData, event: MouseEvent) => {
        node[collapse] = !isUndefined(node[collapse])
            ? !node[collapse]
            : !collapsed

        event.stopPropagation()

        forceUpdate()
    }

    return {
        ...useRecursive({
            data,
            collapsed,
            position,
            propsName: { ...others, collapse },
            dragIndex
        }),
        collapser
    }
}
