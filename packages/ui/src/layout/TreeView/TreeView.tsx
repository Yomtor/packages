import React, { useState, useContext, useEffect } from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode'
import { TreeViewContext, TreeViewContextProps } from './TreeViewContext'
import { DraggableData, DraggableEvent } from 'react-draggable'

const TreeViewItem: React.FC<TreeViewProps> = ({
    nodeComponent: TreeNode,
    ...props
}) => {
    const context = useContext(TreeViewContext)
    const { classes } = TreeViewStyles()

    const dargStopHandler = (event: DraggableEvent, data: DraggableData) => {
        const { dragging, dragNode, dropNode, position } = context

        if (dragging) {
            props.onDragStop(event, data)
            props.sortabled &&
                dropNode &&
                props.onSort({ dragNode, dropNode, position })
            props.draggabled && props.onDrop({ node: dragNode })
        }
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
                        key={key}
                        index={key}
                        {...props}
                        data={child}
                        onDragStop={dargStopHandler}
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

    const dargStopHandeler = (event: DraggableEvent, data: DraggableData) => {
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
            <TreeViewItem
                {...props}
                onDragStop={dargStopHandeler}
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
