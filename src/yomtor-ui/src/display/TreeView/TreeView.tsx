import React, {
    useRef,
    useCallback,
    useReducer,
    useMemo,
    useState,
    useEffect
} from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode/TreeNode'
import { TreeNodeData } from './TreeNode/TreeNode.props'
import { ScrollArea } from '../../utils/ScrollArea'
import { useVirtual, VirtualItem } from 'react-virtual'
import { isArray, isUndefined } from 'lodash'
import { PlayIcon } from '../../icon/Play'
import { useNodeTree } from './use-node-tree'
import { useActiveds } from './use-activeds'
import { Draggable as DraggableUtil } from '../../utils/Draggable/Draggable'
import { Droppable } from '../../utils/Droppable/Droppable'
import { DropEvent } from 'src/utils/Droppable/Droppable.props'

type Positions = 'below' | 'above' | 'in'
/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
    classNames,
    nodeComponent: Node = TreeNode,
    nodeHeight = 32,
    collapsed = false,
    data,
    highlightedProp = 'highlighted',
    activedProp = 'actived',
    collapsedProp = 'collapsed',
    ...props
}) => {
    const [hover, forceHover] = useReducer((x: number) => x + 1, 0)
    const [click, forceClick] = useReducer((x: number) => x + 1, 0)

    const viewportRef = useRef<HTMLDivElement>()
    const scrollRef = useRef<HTMLDivElement>()
    const lineRef = useRef<HTMLDivElement>()
    const draggingItem = useRef<VirtualItem>()
    const targetRef = useRef<HTMLElement>()

    const [scrolling, setScrolling] = useState<boolean>(false)
    const [position, setPosition] = useState<Positions>()

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

    if (
        draggingItem.current &&
        !virtualItems.find((item) => item.index === draggingItem.current.index)
    ) {
        virtualItems.push(draggingItem.current)
    }

    const { activeds, parentActiveds } = useActiveds(nodes, activedProp, [
        click,
        data
    ])

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

    const scrollHandler = () => {
        setScrolling(true)
    }
    const scrollStopHandler = () => {
        setScrolling(false)
    }

    const dropEnterHandler = (node: TreeNodeData, event: DropEvent) => {
        targetRef.current = event.target
        const rect = targetRef.current.getBoundingClientRect()
        let height = rect.height / 2
        const y = event.props.mouseEvent.clientY
        let position: Positions = 'in'

        if (node.children) {
            height = 7
        }

        if (rect.top + height >= y) {
            position = 'above'
        }
        if (rect.bottom - height <= y) {
            position = 'below'
        }

        setPosition(position)
    }

    useEffect(() => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect()
            lineRef.current &&
                (lineRef.current.style.top = `${
                    (position === 'above' ? rect.top : rect.bottom) +
                    scrollRef.current.scrollTop -
                    scrollRef.current.getBoundingClientRect().top
                }px`)
        }
    }, [position])

    const dropHandler = () => {
        // draggingItem.current = undefined
    }

    const Draggable = useMemo(() => {
        if (!scrolling) return DraggableUtil
        return ({ children }) => <>{children}</>
    }, [scrolling])

    const viewport = useMemo(
        () => (
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
                            className={classes.wrapperNode}
                            style={{
                                transform: `translateY(${item.start}px)`
                            }}
                        >
                            <Droppable
                                onMove={(event) =>
                                    dropEnterHandler(node, event)
                                }
                                onDrop={dropHandler}
                            >
                                {() => (
                                    <DraggableUtil
                                        phantom
                                        onStart={() => {
                                            draggingItem.current = item
                                        }}
                                    >
                                        <div
                                            className={cx(classes.node, {
                                                [classes.highlighted]:
                                                    node[highlightedProp] &&
                                                    !node[activedProp],
                                                [classes.actived]:
                                                    activeds.includes(node),
                                                [classes.parentActived]:
                                                    parentActiveds.includes(
                                                        node
                                                    )
                                            })}
                                            {...childHandlers(node)}
                                        >
                                            <div className={classes.indents}>
                                                {[
                                                    ...Array(
                                                        depths[item.index] + 1
                                                    )
                                                ].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={cx(
                                                            classes.indent,
                                                            {
                                                                [classes.first]:
                                                                    !depths[
                                                                        item
                                                                            .index
                                                                    ]
                                                            }
                                                        )}
                                                    />
                                                ))}

                                                <em
                                                    className={cx(
                                                        classes.indent,
                                                        classes.collapser,
                                                        {
                                                            [classes.first]:
                                                                !depths[
                                                                    item.index
                                                                ]
                                                        }
                                                    )}
                                                    style={{
                                                        visibility: isArray(
                                                            node.children
                                                        )
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
                                                    <PlayIcon
                                                        rotate={
                                                            (!isUndefined(
                                                                node[
                                                                    collapsedProp
                                                                ]
                                                            )
                                                                ? !node[
                                                                      collapsedProp
                                                                  ]
                                                                : !collapsed) &&
                                                            90
                                                        }
                                                    />
                                                </em>
                                            </div>
                                            <Node {...node} node={node} />
                                        </div>
                                    </DraggableUtil>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
                {position !== 'in' && (
                    <div ref={lineRef} className={classes.line} />
                )}
            </div>
        ),
        [virtualItems, click, data, hover, position]
    )

    return (
        <div {...props} className={classes.root}>
            <ScrollArea
                ref={scrollRef}
                onScroll={scrollHandler}
                onScrollStop={scrollStopHandler}
            >
                {viewport}
            </ScrollArea>
        </div>
    )
}

TreeView.defaultProps = {}
