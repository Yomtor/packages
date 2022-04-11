import React, {
    useRef,
    useCallback,
    useReducer,
    useMemo,
    useState,
    useEffect
} from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewPositions, TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode/TreeNode'
import { TreeNodeData } from './TreeNode/TreeNode.props'
import { ScrollArea } from '../../utils/ScrollArea'
import { useVirtual, VirtualItem } from 'react-virtual'
import { isArray, isUndefined } from 'lodash'
import { PlayIcon } from '../../icon/Play'
import { useNodeTree } from './use-node-tree'
import { Draggable as DraggableUtil } from '../../utils/Draggable/Draggable'
import { Droppable } from '../../utils/Droppable/Droppable'
import { DropEvent } from 'src/utils/Droppable/Droppable.props'

/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
    classNames,
    nodeComponent: Node = TreeNode,
    nodeHeight = 32,
    indentWitdh = 24,
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
    const distanceX = useRef<number>(0)
    const dropInfo = useRef<{
        drag: TreeNodeData
        drop: TreeNodeData
        position: TreeViewPositions
    }>()

    const [current, setCurrent] = useState<number>()
    const [target, setTarget] = useState<HTMLElement>()
    const [scrolling, setScrolling] = useState<boolean>(false)
    const [position, setPosition] = useState<TreeViewPositions>()
    const [parentHighlighted, setParentHighlighted] = useState<number>()

    const { classes, cx } = TreeViewStyles(
        { ...props, indentWitdh },
        { name: 'TreeView', classNames }
    )

    const {
        nodes,
        depths,
        parents,
        highlighteds,
        activeds,
        childActiveds,
        next,
        collapser
    } = useNodeTree({
        data,
        collapsed,
        position,
        propsName: {
            collapse: collapsedProp,
            active: activedProp,
            highlight: highlightedProp
        }
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

    useEffect(() => {
        if (target) {
            const rect = target.getBoundingClientRect()
            if (lineRef.current) {
                const top =
                    (position === 'above' ? rect.top : rect.bottom) +
                    scrollRef.current.scrollTop -
                    scrollRef.current.getBoundingClientRect().top

                lineRef.current.style.top = `${top}px`
                lineRef.current.style.left = `${
                    indentWitdh * (depths[current] + 1)
                }px`
            }

            dropInfo.current = {
                drag: nodes[draggingItem.current.index],
                drop: nodes[current],
                position
            }
        }
    }, [current, position])

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

    const getAllParents = (index: number, stack = [], first = true) => {
        const nextIndex =
            next[index] && nodes.findIndex((node) => node === next[index])

        if (
            isUndefined(nextIndex) &&
            (depths[index + 1] < depths[index] || !first) &&
            parents[index]
        ) {
            stack.push(parents[index])
            const parent = nodes.findIndex((node) => node === parents[index])

            getAllParents(parent, stack, false)
        }

        return stack
    }

    const dropMoveHandler = ({ target, props }: DropEvent, index: number) => {
        setTarget(target)

        const node = nodes[index]
        const rect = target.getBoundingClientRect()
        const height = node.children ? 10 : rect.height / 2
        const y = props.mouseEvent.clientY

        let position: TreeViewPositions = 'in'
        let parent!: number

        distanceX.current += props.mouseEvent.movementX

        if (rect.top + height >= y) {
            position = 'above'
        }
        if (rect.bottom - height <= y) {
            position = 'below'

            const parents = getAllParents(index).reverse()
            if (parents.length) {
                parents.push(node)
                let indexX = Math.ceil(distanceX.current / indentWitdh) - 2
                if (index > -1) {
                    indexX = Math.min(Math.max(indexX, 0), parents.length - 1)
                }
            } else if (depths[index + 1] > depths[index]) {
                index = index + 1
            }
        }

        if (parents[index]) {
            parent = nodes.findIndex((node) => node === parents[index])
        }

        setCurrent(index)
        setPosition(position)
        setParentHighlighted(parent)
    }

    const mouseLeaveHandler = () => {
        setPosition(undefined)
        setCurrent(undefined)
        setParentHighlighted(undefined)
    }

    const dragStartHandler = (item: VirtualItem) => {
        distanceX.current = 0
        draggingItem.current = item
    }

    const dropHandler = () => {
        console.log(dropInfo.current)
        setPosition(undefined)
        setCurrent(undefined)
        setParentHighlighted(undefined)
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
                                    dropMoveHandler(event, item.index)
                                }
                                onDrop={dropHandler}
                            >
                                {() => (
                                    <DraggableUtil
                                        phantom
                                        move={false}
                                        onStart={() => dragStartHandler(item)}
                                    >
                                        <div
                                            className={cx(classes.node, {
                                                [classes.highlighted]:
                                                    highlighteds[item.index] ||
                                                    parentHighlighted ===
                                                        item.index,
                                                [classes.actived]:
                                                    activeds[item.index],
                                                [classes.parentActived]:
                                                    childActiveds[item.index]
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
                {position && position !== 'in' && (
                    <div ref={lineRef} className={classes.line} />
                )}
            </div>
        ),
        [virtualItems, click, data, hover, position]
    )

    return (
        <div
            {...props}
            className={classes.root}
            onMouseLeave={mouseLeaveHandler}
        >
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
