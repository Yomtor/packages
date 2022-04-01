import React, {
    forwardRef,
    SyntheticEvent,
    useEffect,
    useRef,
    useState
} from 'react'
import { ScrollAreaStyles } from './ScrollArea.styles'
import { ScrollAreaProps } from './ScrollArea.props'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { useDebouncedValue } from '../../uses/use-debounced-value'

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    (
        {
            children,
            className,
            classNames,
            styles,
            scrollbarSize = 10,
            scrollHideDelay = 1000,
            type = 'hover',
            dir,
            offsetScrollbars = false,
            onScrollStop,
            onScroll,
            ...props
        },
        ref
    ) => {
        const scrollTop = useRef<number>(0)
        const currentEvent = useRef<SyntheticEvent<HTMLDivElement>>()
        const [scrollbarHovered, setScrollbarHovered] = useState(false)
        const [debounced] = useDebouncedValue(scrollTop.current, 100)

        const { classes, cx } = ScrollAreaStyles(
            { scrollbarSize, offsetScrollbars, scrollbarHovered },
            { name: 'ScrollArea', classNames, styles }
        )

        const scrollHandler = (event) => {
            event.current = event
            scrollTop.current = event.target.scrollTop
            onScroll && onScroll(event)
        }

        useEffect(() => {
            onScrollStop && onScrollStop(currentEvent.current)
        }, [debounced])

        return (
            <RadixScrollArea.Root
                type={type}
                scrollHideDelay={scrollHideDelay}
                asChild
            >
                <div className={cx(classes.root, className)} {...props}>
                    <RadixScrollArea.Viewport
                        className={classes.viewport}
                        ref={ref}
                        onScroll={scrollHandler}
                    >
                        {children}
                    </RadixScrollArea.Viewport>
                    <RadixScrollArea.Scrollbar
                        orientation='horizontal'
                        className={classes.scrollbar}
                        forceMount
                        onMouseEnter={() => setScrollbarHovered(true)}
                        onMouseLeave={() => setScrollbarHovered(false)}
                    >
                        <RadixScrollArea.Thumb className={classes.thumb} />
                    </RadixScrollArea.Scrollbar>
                    <RadixScrollArea.Scrollbar
                        orientation='vertical'
                        className={classes.scrollbar}
                        forceMount
                        onMouseEnter={() => setScrollbarHovered(true)}
                        onMouseLeave={() => setScrollbarHovered(false)}
                    >
                        <RadixScrollArea.Thumb className={classes.thumb} />
                    </RadixScrollArea.Scrollbar>
                    <RadixScrollArea.Corner className={classes.corner} />
                </div>
            </RadixScrollArea.Root>
        )
    }
)
