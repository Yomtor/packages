import React, { forwardRef } from 'react'
import { StackStyles } from './Stack.styles'
import { StackProps } from './Stack.props'
import { Box } from '../../misc/Box/Box'

/**
 * Description
 */
export const Stack: React.FC<StackProps> = forwardRef<
    HTMLDivElement,
    StackProps
>(
    (
        {
            classNames,
            className,
            styles,
            align = 'stretch',
            justify = 'flex-start',
            spacing = 'md',
            ...props
        },
        ref
    ) => {
        const { classes, cx } = StackStyles(
            { align, justify, spacing },
            { name: 'Stack', classNames, styles }
        )

        return (
            <Box ref={ref} className={cx(classes.root, className)} {...props} />
        )
    }
)
