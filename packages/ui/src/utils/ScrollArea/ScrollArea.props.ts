import { DefaultProps } from '@yomtor/styles'
import { MouseEvent, UIEvent } from 'react'

export type ScrollAreaEvent = {
    x: number
    y: number
    defaultEvent?: UIEvent<HTMLDivElement>
}

export type ScrollAreaProps = DefaultProps & {
    scrollbarSize?: number
    type?: 'auto' | 'always' | 'scroll' | 'hover'
    scrollHideDelay?: number
    dir?: 'ltr' | 'rtl'
    offsetScrollbars?: boolean
    viewportRef?: any // React.forwardRef<HTMLDivElement>
    onScroll?: (event: ScrollAreaEvent) => void
    onClick?: (event: MouseEvent) => void
    children: React.ReactNode
}
