import React, { useRef, useCallback, useReducer } from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode/TreeNode'
import { TreeNodeData } from './TreeNode/TreeNode.props'
import { ScrollArea } from '../../utils/ScrollArea'
import { useVirtual } from 'react-virtual'
import { isArray } from 'lodash'
import { PlayIcon } from '../../icon/Play'
import { useNodeTree } from './use-node-tree'
import { useActiveds } from './use-activeds'

/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
    classNames,
    nodeComponent: Node = TreeNode,
    nodeHeight = 30,
    collapsed = false,
    data,
    highlightedProp = 'highlighted',
    activedProp = 'actived',
    collapsedProp = 'collapsed',
    ...props
}) => {
    const [, forceHover] = useReducer((x: number) => x + 1, 0)
    const [click, forceClick] = useReducer((x: number) => x + 1, 0)

    const viewportRef = useRef<HTMLDivElement>()
    const scrollRef = useRef<HTMLDivElement>()

    const { classes, cx } = TreeViewStyles(
        { ...props },
        { name: 'TreeView', classNames }
    )

    const { nodes, depths, collapser } = useNodeTree({
        data,
        collapsed,
        collapsedProp,
        activedProp
    })

    const { totalSize, virtualItems } = useVirtual({
        size: nodes.length,
        estimateSize: useCallback(() => nodeHeight, []),
        parentRef: scrollRef
    })

    const { activeds, parentActiveds } = useActiveds(nodes, activedProp, click)

    const childHandlers = (data: TreeNodeData) => ({
        onClick: () => {
            data[activedProp] = !data[activedProp]
            forceClick()
        },
        onMouseEnter: () => {
            data[highlightedProp] = true
            forceHover()
        },
        onMouseLeave: () => {
            data[highlightedProp] = false
            forceHover()
        }
    })

    return (
        <div {...props} className={classes.root}>
            <ScrollArea ref={scrollRef}>
                <div
                    ref={viewportRef}
                    className={classes.viewport}
                    style={{ height: totalSize }}
                >
                    {virtualItems.map((item) => {
                        const node = nodes[item.index]
                        return (
                            <div
                                key={item.index}
                                ref={item.measureRef}
                                className={cx(classes.node, {
                                    [classes.highlighted]:
                                        node[highlightedProp] &&
                                        !node[activedProp],
                                    [classes.actived]: activeds.includes(node),
                                    [classes.parentActived]:
                                        parentActiveds.includes(node)
                                })}
                                style={{
                                    transform: `translateY(${item.start}px)`
                                }}
                                {...childHandlers(node)}
                            >
                                <div className={classes.indents}>
                                    {[...Array(depths[item.index] + 1)].map(
                                        (_, i) => (
                                            <span
                                                key={i}
                                                className={cx(classes.indent, {
                                                    [classes.first]:
                                                        !depths[item.index]
                                                })}
                                            />
                                        )
                                    )}

                                    <em
                                        className={cx(
                                            classes.indent,
                                            classes.collapser,
                                            {
                                                [classes.first]:
                                                    !depths[item.index]
                                            }
                                        )}
                                        style={{
                                            visibility: isArray(node.children)
                                                ? 'visible'
                                                : null
                                        }}
                                        onClick={(event) =>
                                            collapser(node, event)
                                        }
                                        onMouseDown={(event) => {
                                            event.stopPropagation()
                                        }}
                                    >
                                        <PlayIcon rotate={!collapsed && 90} />
                                    </em>
                                </div>
                                <Node {...node} node={node} />
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}

TreeView.defaultProps = {}
