import React, { useRef, useState, useCallback } from 'react'
import { DraggableStyles } from './Draggable.styles'
import { DraggableProps } from './Draggable.props'
import ReactDragable, { DraggableData, DraggableEvent } from 'react-draggable'

/**
 * Description
 */
export const Draggable: React.FC<DraggableProps> = ({ children, ...props }) => {
    const nodes = useRef<EventTarget[]>([])
    const handlerRef = useRef<HTMLDivElement>()
    const phantomRef = useRef<HTMLDivElement>()
    const [dragging, setDragging] = useState<boolean>()
    const offset = useRef<{ x: number; y: number }>()

    const { classes } = DraggableStyles({ ...props, dragging })

    const startHandler = (event: DraggableEvent, data: DraggableData) => {
        setDragging(true)

        document.dispatchEvent(new Event('onDragStart', { bubbles: true }))

        offset.current = { x: -data.x, y: -data.y }

        props.onStart && props.onStart(event, data)
    }

    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
        setDragging(false)

        event.target.dispatchEvent(
            new CustomEvent('onDrop', { bubbles: true, detail: props })
        )
        document.dispatchEvent(new Event('onDragStop', { bubbles: true }))
        nodes.current.forEach((n) =>
            n.dispatchEvent(new Event('onDropClear', { bubbles: true }))
        )
        nodes.current = []

        props.onStop && props.onStop(event, data)

        handlerRef.current.style.transform = `translate(0px, 0px)`
    }

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
        updatePhantomPosition(data)

        event.target.dispatchEvent(new Event('onDropMove', { bubbles: true }))

        nodes.current.push(event.target)

        props.onDrag && props.onDrag(event, data)
    }

    const updatePhantomPosition = useCallback(
        (data: DraggableData) => {
            if (!props.phantom || !props.move) return
            const { x, y } = offset.current

            phantomRef.current.style.transform = `translate(${data.x + x}px, ${
                data.y + y
            }px)`
        },
        [props.phantom, props.move]
    )

    return (
        <div className={classes.root}>
            <ReactDragable
                onDrag={dragHandler}
                onStop={stopHandler}
                onStart={startHandler}
                positionOffset={offset.current}
                disabled={props.disabled}
            >
                <div ref={handlerRef} className={classes.handler}>
                    {children}
                </div>
            </ReactDragable>
            {dragging && props.phantom && props.move && (
                <div ref={phantomRef} className={classes.phantom}>
                    {children}
                </div>
            )}
        </div>
    )
}

Draggable.defaultProps = {}
