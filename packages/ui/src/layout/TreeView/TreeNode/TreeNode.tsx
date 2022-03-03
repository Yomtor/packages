import React, {
    MouseEvent,
    useContext,
    useState,
    useRef,
    KeyboardEvent
} from 'react'
import { TreeNodeData, TreeNodeProps } from './TreeNode.props'
import { isUndefined } from 'lodash'
// import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { TreeViewContext } from '../TreeViewContext'
import { PlayIcon } from '../../../icon/Play'
import { Input } from '../../../form/Input'
import {
    Draggable,
    DraggableEvent,
    DraggableData
} from '../../../utils/Draggable'
import { Droppable } from '../../../utils/Droppable'
import { TreeNodeStyles } from './TreeNode.style'
import { TreeViewPosition } from '../TreeView.props'
import { DropEvent } from '../../../utils/Droppable/Droppable.props'

export const TreeNode: React.FC<Omit<TreeNodeProps, 'dragging'>> = ({
    parentUpdate: parentUpdateProp,
    classes: parentClasses,
    ...props
}) => {
    const context = useContext(TreeViewContext)

    const [data, setData] = useState(props.data)
    const [editMode, setEditMode] = useState<boolean>()

    const dropPosition = useRef<TreeViewPosition>(null)
    const input = useRef<HTMLInputElement>()
    const label = useRef<HTMLDivElement>()

    const name = props.data[props.nameKey]
    const children = props.data.children
    const highlighted =
        props.data[props.highlightedKey] &&
        (!context.dragging || (context.dragging && !props.dropDisabled))
    const actived = props.data[props.activedKey]

    const collapsed = isUndefined(data.collapsed)
        ? context.collapsed
        : data.collapsed

    props.dropDisabled =
        (props.data === context.dragNode && children) ||
        props.dropDisabled ||
        !props.sortabled

    const { classes, cx } = TreeNodeStyles(props)

    const changed = () => {
        setData({ ...data })
    }

    const collapserHandler = (e: MouseEvent) => {
        data.collapsed = props.data.collapsed = !collapsed

        e.stopPropagation()

        changed()
    }

    const parentUpdate = (data: Partial<TreeNodeData>) => {
        Object.assign(props.data, data)
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

    const dragStartHandler = (e: DraggableEvent, data: DraggableData) => {
        context.dragNode = props.data
        props.onDragStart(e, data)
    }

    const dragStopHandler = (e: DraggableEvent, data: DraggableData) => {
        props.onDragStop(e, data)
    }

    const dropHandler = (position: TreeViewPosition, data: DropEvent) => {
        context.dropNode = props.data
        context.position = position

        props.onDrop(data)
    }

    return (
        <div className={parentClasses.node}>
            {context.dragging && !props.dropDisabled && (
                <Droppable onDrop={(e) => dropHandler('above', e)}>
                    {(status) => (
                        <div className={cx(parentClasses.above, classes.above)}>
                            {status.overed && <div />}
                        </div>
                    )}
                </Droppable>
            )}
            <Droppable onDrop={(e) => dropHandler('in', e)}>
                {() => (
                    <Draggable
                        move={props.draggabled}
                        phantom={props.draggabled}
                        onStart={dragStartHandler}
                        onStop={dragStopHandler}
                        onMouseDown={(event) => {
                            props.onClick({ data: props.data, event })
                            changed()
                        }}
                        disabled={!props.draggabled && !props.sortabled}
                    >
                        <div
                            className={cx(parentClasses.label, {
                                [parentClasses.actived]: actived,
                                [parentClasses.highlighted]: highlighted
                            })}
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
                                className={parentClasses.collapser}
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

                            <em className={parentClasses.icon}>
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
                                <div>
                                    {props.labelFilter(props.data, changed)}
                                </div>
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
                                    className={parentClasses.actions}
                                    onMouseDown={(event) => {
                                        event.stopPropagation()
                                    }}
                                >
                                    {props.actionFilter(props.data, changed)}
                                </em>
                            ) : null}
                        </div>
                    </Draggable>
                )}
            </Droppable>
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
                                classes={{ ...parentClasses }}
                            />
                        ))}
                    </div>
                    {context.dragging && !props.dropDisabled && (
                        <Droppable onDrop={(e) => dropHandler('in', e)}>
                            {(status) => (
                                <div
                                    className={cx(
                                        parentClasses.childrenBelow,
                                        classes.childrenBelow
                                    )}
                                >
                                    {status.overed && <div />}
                                </div>
                            )}
                        </Droppable>
                    )}
                </>
            ) : null}
            {context.dragging && !props.dropDisabled && (
                <Droppable onDrop={(e) => dropHandler('below', e)}>
                    {(status) => (
                        <div className={cx(parentClasses.below, classes.below)}>
                            {status.overed && <div />}
                        </div>
                    )}
                </Droppable>
            )}
        </div>
    )
}

TreeNode.defaultProps = {
    onClick: () => {},
    depth: 0
}
