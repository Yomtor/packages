import React, { useState, useContext, useEffect } from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode'
import { TreeViewContext, TreeViewContextProps } from './TreeViewContext'
import { DraggableData, DraggableEvent } from 'react-draggable'
import { DropEvent } from '../../utils/Droppable/Droppable.props'

const TreeViewWrapper: React.FC<TreeViewProps> = ({
    nodeComponent: TreeNode,
    ...props
}) => {
    const context = useContext(TreeViewContext)
    const { classes } = TreeViewStyles()

    const dropHandler = (data: DropEvent) => {
        const { dragNode, dropNode, position } = context
        props.sortabled &&
            dropNode &&
            props.onSort({ dragNode, dropNode, position })

        props.onDrop(data)
    }

    return (
        <div
            className={classes.root}
            onClick={(event) => props.onClick({ data: {}, event })}
            onScroll={() => console.log('a')}
        >
            <div className={classes.wrapper}>
                {props.data.map((child, key) => (
                    <TreeNode
                        {...props}
                        key={key}
                        index={key}
                        data={child}
                        onDrop={dropHandler}
                        classes={classes}
                    />
                ))}
            </div>
        </div>
    )
}

/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
    collapsed,
    delay,
    ...props
}) => {
    const [context, setContext] = useState<TreeViewContextProps>({
        dragging: false,
        collapsed: collapsed,
        delay: delay,
        count: 0
    })

    const dragStartHandler = (event: DraggableEvent, data: DraggableData) => {
        setContext({ ...context, dragging: true })
        props.onDragStart(event, data)
    }

    const dragStopHandeler = (event: DraggableEvent, data: DraggableData) => {
        setContext({
            ...context,
            dragging: false,
            dragNode: null,
            dropNode: null,
            count: 0
        })
        props.onDragStop(event, data)
    }

    useEffect(() => {
        setContext({ ...context, collapsed })
    }, [collapsed])

    return (
        <TreeViewContext.Provider value={context}>
            <TreeViewWrapper
                {...props}
                onDragStop={dragStopHandeler}
                onDragStart={dragStartHandler}
            />
        </TreeViewContext.Provider>
    )
}

TreeView.defaultProps = {
    activedKey: 'actived',
    highlightedKey: 'highlighted',
    nameKey: 'name',
    collapsed: true,
    editabled: false,
    data: [],
    nodeComponent: TreeNode,
    delay: 5
}
