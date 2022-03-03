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
import { useIntersectRect } from '../../uses/use-intersect-rect'

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

    const { classes, cx } = DraggableStyles(
        { ...props, dragging, animated },
        { name: 'Draggable' }
    )

    const createPhatom = () => {
        const { top, left, width, height } =
            handlerRef.current.getBoundingClientRect()

        phantomRef.current.style.top = `${top}px`
        phantomRef.current.style.left = `${left}px`
        phantomRef.current.style.width = `${width}px`
        phantomRef.current.style.height = `${height}px`

        phantomRef.current.parentNode.removeChild(phantomRef.current)
    }

    useEffect(() => {
        if (!props.phantom) return

        const animated = ({ detail: { over } }: any) => {
            setAnimated(over)
        }
        document.addEventListener('onDropHover', animated)

        return () => {
            document.removeEventListener('onDropHover', animated)
        }
    }, [props.phantom])

    useEffect(() => {
        createPhatom()
        const element = phantomRef.current
        const transitionend = () => {
            setAnimated(false)
            document.body.removeChild(element)
        }

        element.addEventListener('transitionend', transitionend)

        return () => {
            element.removeEventListener('transitionend', transitionend)
            element.remove()
            setAnimated(true)
        }
    }, [])

    useEffect(() => {
        if (dragging) document.body.append(phantomRef.current)
    }, [dragging])

    const intersect = (target: HTMLElement) => {
        return props.move
            ? useIntersectRect(
                  phantomRef.current.getBoundingClientRect(),
                  target.getBoundingClientRect()
              )
            : true
    }

    const startHandler = (event: DraggableEvent, data: DraggableData) => {
        document.dispatchEvent(new Event('onDragStart', { bubbles: true }))
        setOffset({
            x: -data.x || 0,
            y: -data.y || 0
        })

        distance.current = 0
        status.current = 'started'
    }

    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
        setAnimated(dragging && props.move)
        setDragging(false)

        distance.current = 0
        status.current = 'idle'

        if (intersect(event.target as HTMLElement)) {
            event.target.dispatchEvent(
                new CustomEvent('onDrop', { bubbles: true, detail: props })
            )
        }
        document.dispatchEvent(
            new CustomEvent('onDragStop', { bubbles: true, detail: props })
        )
        nodes.current.forEach((n) =>
            n.dispatchEvent(
                new CustomEvent('onDropClear', { bubbles: true, detail: props })
            )
        )
        nodes.current = []

        props.onStop && props.onStop(event, data)

        if (props.move) {
            phantomRef.current.style.transform = `translate(0px, 0px)`
        }
    }

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
        distance.current += Math.abs(data.deltaX) + Math.abs(data.deltaY)

        if (distance.current < start) return

        if (status.current === 'started') {
            setDragging(true)
            props.onStart && props.onStart(event, data)
            status.current = 'dragging'
        } else {
            updatePhantomPosition(data)

            if (intersect(event.target as HTMLElement)) {
                event.target.dispatchEvent(
                    new CustomEvent('onDropMove', {
                        bubbles: true,
                        detail: props
                    })
                )
                nodes.current.push(event.target)
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
                    className: cx(children.props.className, classes.handler),
                    ref: handlerRef
                })}
            </ReactDragable>
            {cloneElement(Children.only(children), {
                className: cx(children.props.className, classes.phantom),
                ref: phantomRef
            })}
        </>
    )
}

Draggable.defaultProps = {
    move: true,
    throttle: 1,
    start: 5,
    axis: 'both'
}
