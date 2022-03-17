import React, { forwardRef } from 'react'
import { BoxComponent, BoxProps } from './Box.props'
import { PolymorphicRef, useSx } from '@yomtor/styles'

export const Box: BoxComponent = forwardRef(
    <C extends React.ElementType = 'div'>(
        {
            className,
            sx,
            style,
            component: Element = 'div',
            ...props
        }: BoxProps<C>,
        ref: PolymorphicRef<C>
    ) => {
        return (
            <Element
                ref={ref}
                className={useSx(sx, className)}
                style={style}
                {...props}
            />
        )
    }
)
