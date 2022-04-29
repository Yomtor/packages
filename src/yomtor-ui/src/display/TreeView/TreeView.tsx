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
import { isArray, isUndefined, uniqBy } from 'lodash'
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
    sortable = true,
    draggable = false,
    multiple = false,
    ...props
}) => {
    const [hover, forceHover] = useReducer((x: number) => x + 1, 0)
    const [click, forceClick] = useReducer((x: number) => x + 1, 0)

    const viewportRef = useRef<HTMLDivElement>()
    const scrollRef = useRef<HTMLDivElement>()
    const lineRef = useRef<HTMLDivElement>()
    const items = useRef<{ [key: number]: VirtualItem }>({})
    const last = useRef<VirtualItem>()

    const distanceX = useRef<number>(0)
    const dropInfo = useRef<{
        drag: TreeNodeData
        drop: TreeNodeData
        position: TreeViewPositions
    }>()

    const [current, setCurrent] = useState<number>()
    const [target, setTarget] = useState<HTMLElement>()
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
        disableDrops,
        collapser
    } = useNodeTree({
        data,
        collapsed,
        position,
        propsName: {
            collapse: collapsedProp,
            active: activedProp,
            highlight: highlightedProp
        },
        items: items.current
    })

    let { totalSize, virtualItems } = useVirtual({
        size: nodes.length,
        estimateSize: useCallback(() => nodeHeight, []),
        parentRef: scrollRef
    })

    if (Object.keys(items.current).length) {
        virtualItems = uniqBy(
            virtualItems.concat(Object.values(items.current)),
            'index'
        )
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
                drag: Object.keys(items.current).length
                    ? Object.keys(items.current).map((index) => nodes[index])
                    : undefined,
                drop:
                    !isUndefined(current) &&
                    !disableDrops[current] &&
                    !(
                        Object.keys(items.current).includes(
                            current.toString()
                        ) && position === 'in'
                    )
                        ? nodes[current]
                        : undefined,
                position
            }
        }
    }, [current, position])

    const mouseDownHandler = (event: MouseEvent, item: VirtualItem) => {
        if (
            !multiple ||
            (!event.shiftKey &&
                !event.metaKey &&
                !Object.keys(items.current).includes(item.index.toString()))
        ) {
            Object.keys(items.current).forEach(
                (index) => (nodes[index][activedProp] = false)
            )
            items.current = {}
        }

        if (
            event.metaKey &&
            multiple &&
            Object.keys(items.current).includes(item.index.toString())
        ) {
            nodes[item.index][activedProp] = false
            delete items.current[item.index]
        } else if (
            event.shiftKey &&
            multiple &&
            Object.keys(items.current).length
        ) {
            const max = Math.max(...[last.current.index, item.index])
            const min = Math.min(...[last.current.index, item.index])
            Array(max - min + 1)
                .fill(0)
                .forEach((_, i) => {
                    items.current[i + min] = {
                        ...item,
                        index: i + min
                    }
                })
        } else {
            items.current[item.index] = item
            last.current = item
        }

        Object.keys(items.current).forEach(
            (index) => (nodes[index][activedProp] = true)
        )

        forceClick()
    }

    const mouseUpHandler = (event: React.MouseEvent, item: VirtualItem) => {
        if (multiple && !event.shiftKey && !event.metaKey && !position) {
            Object.keys(items.current).forEach(
                (index) => (nodes[index][activedProp] = false)
            )
            items.current = {}

            items.current[item.index] = item

            Object.keys(items.current).forEach(
                (index) => (nodes[index][activedProp] = true)
            )

            forceClick()
        }

        setPosition(undefined)
        setCurrent(undefined)
        setParentHighlighted(undefined)
    }

    const childHandlers = (data: TreeNodeData) => ({
        onMouseEnter: () => {
            data[highlightedProp] = true
            forceHover()
        },
        onMouseLeave: () => {
            data[highlightedProp] = false
            forceHover()
        }
    })

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

            const closets = getAllParents(index).reverse()
            if (closets.length) {
                closets.push(node)
                let indexX = Math.ceil(distanceX.current / indentWitdh) - 2

                if (indexX > -1) {
                    indexX = Math.min(Math.max(indexX, 0), closets.length - 1)
                    index = nodes.findIndex((node) => node === closets[indexX])
                } else {
                    index = nodes.findIndex((node) => node === closets[0])
                }
            } else if (depths[index + 1] > depths[index]) {
                index = index + 1
            }
        }

        if (parents[index] && position !== 'in') {
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
        // draggingItem.current = item
    }

    const dropHandler = () => {
        console.log(dropInfo.current)

        // items.current = {}
    }

    const Draggable = useMemo(() => {
        if (sortable || draggable) return DraggableUtil
        return ({ children }) => <>{children}</>
    }, [sortable])

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
                            onMouseUp={(event) => mouseUpHandler(event, item)}
                        >
                            <Droppable
                                onMove={(event) =>
                                    dropMoveHandler(event, item.index)
                                }
                                onDrop={dropHandler}
                                disabled={!sortable}
                            >
                                {() => (
                                    <Draggable
                                        phantom={draggable}
                                        move={draggable}
                                        onMouseDown={(event) =>
                                            mouseDownHandler(event, item)
                                        }
                                        onStart={() => dragStartHandler(item)}
                                        data={Object.keys(items.current).map(
                                            (index) => data[index]
                                        )}
                                    >
                                        <div
                                            className={cx(classes.node, {
                                                [classes.highlighted]:
                                                    (parentHighlighted ===
                                                        item.index ||
                                                        highlighteds[
                                                            item.index
                                                        ]) &&
                                                    !disableDrops[item.index] &&
                                                    !Object.keys(
                                                        items.current
                                                    ).includes(
                                                        item.index.toString()
                                                    ),
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
                                    </Draggable>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
                {position && position !== 'in' && !disableDrops[current] && (
                    <div ref={lineRef} className={classes.line} />
                )}
            </div>
        ),
        [
            virtualItems,
            click,
            data,
            hover,
            position,
            parentHighlighted,
            disableDrops
        ]
    )

    return (
        <div
            {...props}
            className={classes.root}
            onMouseLeave={mouseLeaveHandler}
        >
            <ScrollArea ref={scrollRef}>{viewport}</ScrollArea>
        </div>
    )
}

TreeView.defaultProps = {}
