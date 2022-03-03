import React, { useEffect, useRef, useState } from 'react'
import { DroppableStyles } from './Droppable.styles'
import { DropEvent, DroppableProps } from './Droppable.props'
import { useDropzone } from 'react-dropzone'
import { isArray, isFunction, isString, isUndefined } from 'lodash'

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
    children,
    accept,
    maxSize = Infinity,
    click = false,
    multiple,
    disabled,
    loading,
    external = false,
    ...props
}) => {
    const element = useRef<HTMLDivElement>()
    const counter = useRef(0)
    const data = useRef()
    const [dragging, setDragging] = useState<boolean>(false)
    const [over, setOver] = useState<boolean>()
    const [isDropAccept, setIsDropAccept] = useState<boolean>()
    const [isDropReject, setIsDropReject] = useState<boolean>()

    useEffect(() => {
        if (isUndefined(over)) return
        document.dispatchEvent(
            new CustomEvent('onDropHover', {
                bubbles: true,
                detail: { over, ...props }
            })
        )
    }, [over])

    const { classes, cx } = DroppableStyles(
        { ...props },
        { name: 'Droppable', classNames }
    )

    const move = (event: Event | File[]) => {
        if (!over) {
            setOver(true)
            data.current = (event as CustomEvent).detail
            onEnter && onEnter(createEvent(event))
        }
    }

    const clear = () => {
        counter.current = 0
        setOver(false)
        setDragging(false)
    }

    const drop = (event: Event, files?: File[]) => {
        onDrop && onDrop(createEvent(event, files))

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

    const enterHandler = (event: Event, force?: boolean) => {
        if (over || force) {
            setOver(true)
            onEnter && onEnter(createEvent(event, force))
        }
    }
    const leaveHandler = (event: Event, force?: boolean) => {
        if (over || force) {
            setOver(false)
            onLeave && onLeave(createEvent(event, force))
        }
    }

    const createEvent = (
        event: Event | File[],
        files?: boolean | File[]
    ): DropEvent => {
        return {
            type: files ? 'files' : 'event',
            props: !files && data.current,
            defaultEvent: !(event instanceof Array) ? event : null,
            files: isArray(files) ? files : []
        }
    }

    useEffect(() => {
        if (!accept || !data.current) return
        if (!over) {
            setIsDropReject(false)
            setIsDropAccept(false)
            return
        }
        if (
            accept.reduce((stack, current) => {
                if (isString(current) || !stack) return stack
                if (
                    isFunction(current) &&
                    !current({ type: 'event', props: data.current })
                )
                    return false

                return true
            }, true)
        ) {
            setIsDropReject(false)
            setIsDropAccept(true)
        } else {
            setIsDropReject(true)
            setIsDropAccept(false)
        }
    }, [over, accept])

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

    const externalDisabled = disabled || loading || !external
    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
        useDropzone({
            onDropAccepted: (files, event: any) => drop(event, files),
            onDropRejected: (fileRejections) => onReject(fileRejections),
            onDragEnter: (event: any) => enterHandler(event, true),
            onDragLeave: (event: any) => leaveHandler(event, true),
            disabled: externalDisabled,
            accept:
                accept && (accept.filter((item) => isString(item)) as string[]),
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
                [classes.error]: isDragReject || isDropReject
            })}
            ref={element}
            onMouseEnter={(event: any) => enterHandler(event)}
            onMouseLeave={(event: any) => leaveHandler(event)}
            {...getRootProps({ ref: element })}
        >
            <input {...getInputProps()} />
            {(isFunction(children) &&
                children({
                    accepted: isDragAccept || isDropAccept,
                    rejected: isDragReject || isDropReject,
                    overed: over,
                    dragged: dragging
                })) ||
                children}
        </div>
    )
}

Droppable.defaultProps = {}
