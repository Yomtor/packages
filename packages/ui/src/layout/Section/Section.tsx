import React from 'react'
import { SectionStyles } from './Section.styles'
import { SectionProps } from './Section.props'

/**
 * Description
 */
export const Section: React.FC<SectionProps> = ({
    children,
    visible,
    ...props
}) => {
    const { classes } = SectionStyles({ ...props })

    return (
        <>{visible ? <div className={classes.root}>{children}</div> : null}</>
    )
}

Section.defaultProps = {
    visible: true
}
