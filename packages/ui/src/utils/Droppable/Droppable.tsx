import React, { useEffect, useRef, useState } from 'react'
import { DroppableStyles } from './Droppable.styles'
import { DroppableProps } from './Droppable.props'
import { useDropzone } from 'react-dropzone'

/**
 * Description
 */
export const Droppable: React.FC<DroppableProps> = ({
    classNames,
    styles,
    onDrop,
    onEnter,
    onLeave,
    onReject,
    onMove,
    children,
    accept,
    maxSize = Infinity,
    click = false,
    multiple,
    disabled,
    loading,
    external = true,
    ...props
}) => {
    const element = useRef<HTMLDivElement>()
    const counter = useRef(0)
    const [dragging, setDragging] = useState<boolean>(false)
    const [over, setOver] = useState<boolean>(false)

    const { classes, cx } = DroppableStyles(
        { ...props },
        { name: 'Droppable', classNames }
    )

    const move = () => {
        if (!over) {
            setOver(true)
            onEnter && onEnter()
        } else {
            onMove && onMove()
        }
    }

    const clear = () => {
        counter.current = 0
        setOver(false)
        setDragging(false)
    }

    const drop = (data: File[] | Event) => {
        onDrop &&
            onDrop(
                data instanceof Event
                    ? { ...data, type: 'event' }
                    : { files: data, type: 'file' }
            )
        clear()
    }

    const dragStart = () => {
        counter.current++
        setDragging(true)
    }

    const dragStop = () => {
        counter.current--
        if (!counter.current) {
            setDragging(false)
        }
    }

    const enterHandler = (force?: boolean) => {
        if (over || force) {
            setOver(true)
            onEnter && onEnter()
        }
    }
    const leaveHandler = (force?: boolean) => {
        if (over || force) {
            setOver(false)
            onLeave && onLeave()
        }
    }

    useEffect(() => {
        document.addEventListener('onDragStart', dragStart)
        document.addEventListener('dragenter', dragStart)
        document.addEventListener('onDragStop', dragStop)
        document.addEventListener('dragleave', dragStop)
        document.addEventListener('drop', clear)

        element.current.addEventListener('onDropMove', move)
        element.current.addEventListener('onDropClear', clear)
        element.current.addEventListener('onDrop', drop)

        return () => {
            document.removeEventListener('onDragStart', dragStart)
            document.removeEventListener('dragenter', dragStart)
            document.removeEventListener('onDragStop', dragStop)
            document.removeEventListener('dragleave', dragStop)
            document.removeEventListener('drop', clear)

            if (!element.current) return
            drop && element.current.removeEventListener('onDropMove', move)
            drop && element.current.removeEventListener('onDropClear', clear)
            stop && element.current.removeEventListener('onDrop', drop)
        }
    })

    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
        useDropzone({
            onDropAccepted: (files) => drop(files),
            onDropRejected: (fileRejections) => onReject(fileRejections),
            onDragEnter: () => enterHandler(true),
            onDragLeave: () => leaveHandler(true),
            disabled: disabled || loading || !external,
            accept,
            multiple,
            maxSize,
            noClick: !click,
            noKeyboard: !click
        })

    return (
        <div
            className={cx(classes.root, {
                [classes.over]: over,
                [classes.dragging]: dragging,
                [classes.error]: isDragReject
            })}
            ref={element}
            onMouseEnter={() => enterHandler()}
            onMouseLeave={() => leaveHandler()}
            {...getRootProps({ ref: element })}
        >
            <input {...getInputProps()} />
            {children({
                accepted: isDragAccept,
                rejected: isDragReject,
                overed: over,
                dragged: dragging
            })}
        </div>
    )
}

Droppable.defaultProps = {}
