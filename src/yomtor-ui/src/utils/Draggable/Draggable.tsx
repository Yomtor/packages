import React, {
    Children,
    cloneElement,
    useEffect,
    useRef,
    useState
} from 'react'
import { DraggableStyles } from './Draggable.styles'
import { DraggableProps } from './Draggable.props'
import ReactDragable, { DraggableData, DraggableEvent } from 'react-draggable'

/**
 * Description
 */
export const Draggable: React.FC<DraggableProps> = ({
    children,
    start,
    throttle,
    ...props
}) => {
    const nodes = useRef<EventTarget[]>([])
    const handlerRef = useRef<HTMLDivElement>()
    const phantomRef = useRef<HTMLDivElement>()
    const [dragging, setDragging] = useState<boolean>()
    const [animated, setAnimated] = useState<boolean>()
    const [offset, setOffset] = useState<{ x: number; y: number }>()
    const distance = useRef<number>(0)
    const status = useRef<'started' | 'dragging' | 'idle'>('idle')

    const { classes } = DraggableStyles(
        { ...props, dragging, animated },
        { name: 'Draggable' }
    )

    const updatePanthom = () => {
        const { top, left, width, height } =
            handlerRef.current.getBoundingClientRect()

        phantomRef.current.classList.remove(...classes.handler.split(' '))
        phantomRef.current.classList.add(...classes.phantom.split(' '))

        phantomRef.current.style.top = `${top}px`
        phantomRef.current.style.left = `${left}px`
        phantomRef.current.style.width = `${width}px`
        phantomRef.current.style.height = `${height}px`
    }

    useEffect(() => {
        if (dragging && props.move) {
            phantomRef.current = handlerRef.current.cloneNode(
                true
            ) as HTMLDivElement
            document.body.append(phantomRef.current)

            updatePanthom()

            const transitionend = () => {
                setAnimated(undefined)
                phantomRef.current.remove()
            }

            phantomRef.current.addEventListener('transitionend', transitionend)
        }
    }, [dragging])

    useEffect(() => {
        phantomRef.current &&
            (phantomRef.current.style.transition = `transform ${
                animated ? '.3s' : '.00001ms'
            } ease-in-out`)
    }, [animated])

    const intersect = (target: HTMLElement) => {
        return target.closest('[data-droppable]')
    }

    const startHandler = (_: DraggableEvent, data: DraggableData) => {
        setOffset({
            x: -data.x || 0,
            y: -data.y || 0
        })

        distance.current = 0
        status.current = 'started'
    }

    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
        if (status.current !== 'dragging') return

        setDragging(false)

        distance.current = 0
        status.current = 'idle'

        if (intersect(event.target as HTMLElement)) {
            event.target.dispatchEvent(
                new CustomEvent('onDrop', {
                    bubbles: true,
                    detail: { ...props, mouseEvent: event }
                })
            )
            setAnimated(props.move ? false : undefined)
        } else {
            setAnimated(props.move ? true : undefined)
        }

        document.dispatchEvent(
            new CustomEvent('onDragStop', {
                bubbles: true,
                detail: { ...props, mouseEvent: event }
            })
        )

        nodes.current.forEach((n) => {
            n.dispatchEvent(
                new CustomEvent('onDropClear', {
                    bubbles: true,
                    detail: { ...props, mouseEvent: event }
                })
            )
        })

        nodes.current = []

        props.onStop && props.onStop(event, data)

        if (props.move && phantomRef.current) {
            phantomRef.current.style.transform = `translate(0px, 0px)`
        }
    }

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
        distance.current += Math.abs(data.deltaX) + Math.abs(data.deltaY)

        if (distance.current < start) return

        if (status.current === 'started') {
            setDragging(true)
            document.dispatchEvent(new Event('onDragStart', { bubbles: true }))
            props.onStart && props.onStart(event, data)
            status.current = 'dragging'
        } else {
            updatePhantomPosition(data)

            if (intersect(event.target as HTMLElement)) {
                event.target.dispatchEvent(
                    new CustomEvent('onDropMove', {
                        bubbles: true,
                        detail: { ...props, mouseEvent: event }
                    })
                )
                if (!nodes.current.includes(event.target)) {
                    nodes.current.push(event.target)
                }
            }

            props.onDrag && props.onDrag(event, data)
        }
    }

    const updatePhantomPosition = (data: DraggableData) => {
        if (!props.move) return
        let { x, y } = offset

        x = data.x + x
        y = data.y + y

        if (props.axis !== 'both' && props.axis !== 'x') {
            x = 0
        }
        if (props.axis !== 'both' && props.axis !== 'y') {
            y = 0
        }

        updatePanthom()

        phantomRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    return (
        <>
            <ReactDragable
                {...props}
                axis='both'
                onDrag={dragHandler}
                onStop={stopHandler}
                onStart={startHandler}
                positionOffset={offset}
                disabled={props.disabled}
                grid={[throttle, throttle]}
                nodeRef={handlerRef}
            >
                {cloneElement(Children.only(children), {
                    className: `${
                        (children.props.className &&
                            children.props.className + ' ') ||
                        ''
                    }${classes.handler}`,
                    ref: handlerRef
                })}
            </ReactDragable>
        </>
    )
}

Draggable.defaultProps = {
    move: true,
    throttle: 1,
    start: 5,
    axis: 'both'
}
