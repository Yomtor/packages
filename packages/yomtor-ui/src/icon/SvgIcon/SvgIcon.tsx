import React from 'react'
import { SvgIconProps } from './SvgIcon.props'
import { SvgIconStyles } from './SvgIcon.styles'

export const SvgIcon: React.FC<SvgIconProps> = ({
    children,
    viewport,
    rotate,
    hidden,
    ...props
}) => {
    const { classes } = SvgIconStyles({ hidden, rotate })

    return (
        <svg viewBox={viewport} className={classes.root} {...props}>
            {children}
        </svg>
    )
}

SvgIcon.defaultProps = {
    rotate: null,
    viewport: '0 0 24 24',
    hidden: false
}
