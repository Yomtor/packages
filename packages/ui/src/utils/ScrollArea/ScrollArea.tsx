import React, { forwardRef, useState } from 'react'
import { ScrollAreaStyles } from './ScrollArea.styles'
import { ScrollAreaProps } from './ScrollArea.props'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'

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
            viewportRef,
            onScroll,
            ...props
        },
        ref
    ) => {
        const [scrollbarHovered, setScrollbarHovered] = useState(false)

        const { classes, cx } = ScrollAreaStyles(
            { scrollbarSize, offsetScrollbars, scrollbarHovered },
            { name: 'ScrollArea', classNames, styles }
        )

        return (
            <RadixScrollArea.Root
                type={type}
                scrollHideDelay={scrollHideDelay}
                asChild
            >
                <div
                    ref={ref}
                    className={cx(classes.root, className)}
                    {...props}
                >
                    <RadixScrollArea.Viewport
                        className={classes.viewport}
                        ref={viewportRef}
                        onScroll={
                            typeof onScroll === 'function'
                                ? (event) =>
                                      onScroll({
                                          x: event.currentTarget.scrollLeft,
                                          y: event.currentTarget.scrollTop,
                                          defaultEvent: event
                                      })
                                : undefined
                        }
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
