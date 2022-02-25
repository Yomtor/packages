import React, {
    MouseEvent,
    useContext,
    useState,
    useRef,
    KeyboardEvent
} from 'react'
import { TreeNodeData, TreeNodeProps } from './TreeNode.props'
import { isUndefined } from 'lodash'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { TreeViewContext } from '../TreeViewContext'
import { PlayIcon } from '../../../icon/Play'
import clsx from 'clsx'
import { Input } from '../../../form/Input'

/**
 * Description
 */
export const TreeNode: React.FC<Omit<TreeNodeProps, 'dragging'>> = ({
    parentUpdate: parentUpdateProp,
    classes,
    ...props
}) => {
    const dropPosition = useRef<'in' | 'below' | 'above'>(null)
    const [data, setData] = useState(props.data)
    const [editMode, setEditMode] = useState<boolean>()
    const input = useRef<HTMLInputElement>()
    const label = useRef<HTMLDivElement>()
    const phantom = useRef<HTMLDivElement>()
    const phantomOffset = useRef<{ x: number; y: number }>()
    props.data.depth = props.depth
    props.data.index = !isUndefined(data.index) ? data.index : props.index

    const context = useContext(TreeViewContext)
    const children = props.data.children
    props.dropDisabled =
        (props.data === context.dragNode && children) ||
        props.dropDisabled ||
        !props.sortabled

    const highlighted =
        props.data[props.highlightedKey] &&
        (!context.dragging || (context.dragging && !props.dropDisabled))
    const actived = props.data[props.activedKey]
    const name = props.data[props.nameKey]

    const collapsed = isUndefined(data.collapsed)
        ? context.collapsed
        : data.collapsed

    const changed = () => {
        setData({ ...data })
    }

    const collapserHandler = (e: MouseEvent) => {
        data.collapsed = props.data.collapsed = !collapsed

        e.stopPropagation()

        changed()
    }

    const mouseEnterHandler = () => {
        props.data[props.highlightedKey] = true

        context.dropNode = props.data
        context.position = 'in'

        changed()
    }

    const mouseLeaveHandler = () => {
        props.data[props.highlightedKey] = false

        context.dropNode = context.position = dropPosition.current = null

        parentUpdateProp
            ? parentUpdateProp({ [props.highlightedKey]: false })
            : changed()
    }

    const mouseAboveEnterHandler = () => {
        if (context.dragging) {
            context.dropNode = props.data
            dropPosition.current = context.position = 'above'

            parentUpdateProp
                ? parentUpdateProp({ [props.highlightedKey]: true })
                : changed()
        }
    }

    const mouseBelowEnterHandler = () => {
        if (context.dragging) {
            context.dropNode = props.data
            dropPosition.current = context.position = 'below'

            parentUpdateProp
                ? parentUpdateProp({ [props.highlightedKey]: true })
                : changed()
        }
    }

    const mouseChildrenBelowHandler = () => {
        if (context.dragging) {
            props.data[props.highlightedKey] = true
            context.dropNode = props.data
            dropPosition.current = context.position = 'in'

            changed()
        }
    }

    const createPhantom = (e: DraggableEvent, data: DraggableData) => {
        const { x, y } = phantomOffset.current
        phantom.current = label.current.cloneNode(true) as HTMLDivElement
        phantom.current.classList.add(classes.phantom)
        const { top, left, width, height } =
            label.current.getBoundingClientRect()

        phantom.current.style.top = `${top - y}px`
        phantom.current.style.left = `${left - x}px`
        phantom.current.style.width = `${width}px`
        phantom.current.style.height = `${height}px`
        phantom.current.style.fontFamily = getComputedStyle(
            label.current
        ).fontFamily

        document.body.appendChild(phantom.current)
    }

    const dragStartHandler = (_: DraggableEvent, { x, y }: DraggableData) => {
        phantomOffset.current = { x, y }
    }

    const dragStart = (e: DraggableEvent, data: DraggableData) => {
        context.dragNode = props.data

        props.draggabled && createPhantom(e, data)

        props.onDragStart(e, data)
    }

    const dragStopHandler = (e: DraggableEvent, data: DraggableData) => {
        if (context.dragging) {
            phantom.current && phantom.current.remove()
            props.onDragStop(e, data)
        }

        phantom.current = null
    }

    const dragHandler = (e: DraggableEvent, data: DraggableData) => {
        context.count += props.sortabled && data.deltaY
        context.count += props.draggabled && data.deltaX

        if (!context.dragging && Math.abs(context.count) > context.delay) {
            dragStart(e, data)
        }
        if (phantom.current) {
            phantom.current.style.setProperty(
                'transform',
                `translate(${data.x}px, ${data.y}px)`,
                'important'
            )
        }
        if (context.dragging) {
            props.onDrag(e, data)
        }
    }

    const parentUpdate = (data: Partial<TreeNodeData>) => {
        Object.assign(props.data, data)
        changed()
    }

    const inputEvents = {
        onBlur: () => {
            props.data[props.nameKey] = input.current.value
            setEditMode(false)
        },
        onMouseDown: (event: MouseEvent) => {
            event.stopPropagation()
        },
        onKeyDown: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                props.data.name = input.current.value
                setEditMode(false)
            }
            if (event.key === 'Escape') {
                setEditMode(false)
            }
        }
    }

    return (
        <div className={classes.node}>
            {context.dragging && !props.dropDisabled && (
                <div
                    className={classes.above}
                    style={{
                        top: props.data.children ? -7 : 0,
                        height: props.data.children ? 14 : '50%'
                    }}
                    onMouseEnter={mouseAboveEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                >
                    {dropPosition.current === 'above' && (
                        <div
                            style={{
                                left: props.depth * 20 + 19,
                                top: props.data.children ? 6 : -1
                            }}
                        />
                    )}
                </div>
            )}
            <Draggable
                axis='y'
                onDrag={dragHandler}
                onStop={dragStopHandler}
                onStart={dragStartHandler}
                onMouseDown={(event) => {
                    props.onClick({ data: props.data, event })
                    changed()
                }}
                disabled={!props.draggabled && !props.sortabled}
            >
                <div
                    className={clsx(
                        classes.label,
                        actived && classes.actived,
                        highlighted && classes.highlighted
                    )}
                    style={{
                        paddingLeft:
                            props.depth * (props.depth > 1 ? 20 : 15) -
                            (props.depth > 1 ? 5 : 0) +
                            5
                    }}
                    ref={label}
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                >
                    <em
                        className={classes.collapser}
                        style={{
                            visibility:
                                (props.data.children &&
                                    props.data.children.length &&
                                    'visible') ||
                                null,
                            width: props.depth > 0 && 20
                        }}
                        onClick={collapserHandler}
                        onMouseDown={(event) => {
                            event.stopPropagation()
                        }}
                    >
                        <PlayIcon rotate={!collapsed && 90} />
                    </em>

                    <em className={classes.icon}>
                        {props.iconFilter
                            ? props.iconFilter(props.data, changed)
                            : null}
                    </em>
                    {!props.labelFilter && !editMode && (
                        <label
                            onDoubleClick={() =>
                                props.editabled && setEditMode(true)
                            }
                        >
                            {name}
                        </label>
                    )}
                    {props.labelFilter && (
                        <div>{props.labelFilter(props.data, changed)}</div>
                    )}
                    {!props.labelFilter && editMode && (
                        <Input
                            ref={input}
                            autoFocus
                            {...inputEvents}
                            defaultValue={name}
                        />
                    )}

                    {props.actionFilter ? (
                        <em
                            className={classes.actions}
                            onMouseDown={(event) => {
                                event.stopPropagation()
                            }}
                        >
                            {props.actionFilter(props.data, changed)}
                        </em>
                    ) : null}
                </div>
            </Draggable>
            {children && !collapsed && children.length ? (
                <>
                    <div>
                        {children.map((child: TreeNodeData, key: number) => (
                            <TreeNode
                                key={key}
                                {...props}
                                data={child}
                                index={key}
                                depth={props.depth + 1}
                                parentUpdate={parentUpdate}
                                classes={{ ...classes }}
                            />
                        ))}
                    </div>
                    {context.dragging && !props.dropDisabled && (
                        <div
                            className={classes.childrenBelow}
                            style={{
                                height: 14,
                                left: props.depth * 20 + 40,
                                zIndex: props.depth + 2
                            }}
                            onMouseMove={mouseChildrenBelowHandler}
                            onMouseLeave={mouseLeaveHandler}
                        >
                            {dropPosition.current === 'in' && (
                                <div
                                    style={{
                                        bottom: props.data.children ? 6 : -1
                                    }}
                                />
                            )}
                        </div>
                    )}
                </>
            ) : null}
            {context.dragging && !props.dropDisabled && (
                <div
                    className={classes.below}
                    style={{
                        bottom: props.data.children ? -7 : 0,
                        height: props.data.children ? 14 : '50%'
                    }}
                    onMouseEnter={mouseBelowEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                >
                    {dropPosition.current === 'below' && (
                        <div
                            style={{
                                left: props.depth * 20 + 19,
                                bottom: props.data.children ? 6 : -1
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

TreeNode.defaultProps = {
    onClick: () => {},
    depth: 0
}
