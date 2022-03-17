import React, { forwardRef } from 'react'
import { ButtonStyles } from './Button.styles'
import { ButtonComponent, ButtonProps } from './Button.props'
import Ink from 'react-ink'
import { useHover } from '../../uses/use-hover'
import { useSetRef } from '../../uses/use-set-ref'
import { Box } from '../../misc/Box/Box'
import { PolymorphicRef } from '@yomtor/styles'

export const Button: ButtonComponent = forwardRef(
    <C extends React.ElementType = 'button'>(
        { component, children, ...props }: ButtonProps<C>,
        ref: PolymorphicRef<C>
    ) => {
        const { hovered, ref: button } = useHover<HTMLButtonElement>()

        const { classes } = ButtonStyles({
            hovered,
            ...props
        })

        return (
            <Box
                component='button'
                ref={(node) => useSetRef(node, button, ref)}
                className={classes.root}
                {...props}
            >
                <span className={classes.hover} />
                <span className={classes.content}>{children}</span>
                <Ink hasTouch={false} opacity={0.05} />
            </Box>
        )
    }
)

Button.defaultProps = {
    hoverOpacity: 0.7
}
