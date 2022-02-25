import React, { forwardRef } from 'react'
import { ButtonStyles } from './Button.styles'
import { ButtonProps } from './Button.props'
import Ink from 'react-ink'
import { useHover } from '../../uses/use-hover'
import { useSetRef } from '../../uses/use-set-ref'

/**
 * Description
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, fullWidth, hoverOpacity, ...props }, ref) => {
        const { hovered, ref: button } = useHover<HTMLButtonElement>()

        const { classes } = ButtonStyles({
            hovered,
            hoverOpacity,
            fullWidth,
            ...props
        })

        return (
            <button
                ref={(node) => useSetRef(node, button, ref)}
                className={classes.root}
                {...props}
            >
                <span className={classes.hover} />
                <span className={classes.content}>{children}</span>
                <Ink hasTouch={false} opacity={0.05} />
            </button>
        )
    }
)

Button.defaultProps = {
    hoverOpacity: 0.7
}
