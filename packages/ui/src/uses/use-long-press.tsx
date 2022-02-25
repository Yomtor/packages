import { useEffect, useState } from 'react'

export const useLongPress = (callback: (e: any) => void) => {
    const [mouseEvent, setMouseEvent] = useState<any | null>(null)
    const [keyEvent, setKeyEvent] = useState<any | null>(null)

    useEffect(() => {
        const keyDown = (e: any) => {
            if (
                ['Shift', 'Control', 'Meta', 'Alt'].includes(e.key) &&
                mouseEvent
            ) {
                setKeyEvent(e)
            }
        }
        const keyUp = (e: any) => {
            if (
                ['Shift', 'Control', 'Meta', 'Alt'].includes(e.key) &&
                mouseEvent
            ) {
                setKeyEvent(e)
            } else {
                setKeyEvent(null)
            }
        }

        document.addEventListener('keydown', keyDown)
        document.addEventListener('keyup', keyUp)

        return () => {
            document.removeEventListener('keydown', keyDown)
            document.removeEventListener('keyup', keyUp)
        }
    }, [mouseEvent])

    useEffect(() => {
        let interval: any
        let timeout: any

        if (mouseEvent) {
            if (keyEvent) {
                mouseEvent.altKey = keyEvent.altKey
                mouseEvent.metaKey = keyEvent.metaKey
                mouseEvent.shiftKey = keyEvent.shiftKey
                mouseEvent.ctrlKey = keyEvent.ctrlKey
            }

            callback(mouseEvent)
            timeout = setTimeout(
                () => {
                    interval = setInterval(() => {
                        callback(mouseEvent)
                    }, 100)
                },
                keyEvent ? 0 : 700
            )
        } else {
            clearInterval(interval)
            clearTimeout(timeout)
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [keyEvent, mouseEvent])

    return {
        onMouseDown: (e: any) => setMouseEvent(e),
        onMouseUp: () => setMouseEvent(null),
        onMouseLeave: () => setMouseEvent(null),
        onTouchStart: (e: any) => setMouseEvent(e),
        onTouchEnd: () => setMouseEvent(null)
    }
}
