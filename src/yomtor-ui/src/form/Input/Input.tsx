import React, { forwardRef } from 'react'
import { InputStyles } from './Input.styles'
import { InputProps } from './Input.props'

/**
 * Description
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ fullWidth, ...props }, ref) => {
        const { classes } = InputStyles({ fullWidth, ...props })

        return (
            <input
                className={classes.root}
                ref={ref}
                autoComplete='off'
                {...props}
            />
        )
    }
)

Input.defaultProps = {
    onChange: () => {}
}
