import React from 'react'
import { BlockStyles } from './Block.styles'
import { BlockProps } from './Block.props'

/**
 * Description
 */
export const Block: React.FC<BlockProps> = ({
    children,
    visible,
    ...props
}) => {
    const { classes } = BlockStyles({ ...props })

    return (
        <>{visible ? <div className={classes.root}>{children}</div> : null}</>
    )
}

Block.defaultProps = {
    visible: true,
    gap: 10,
    margin: 10,
    padding: 10
}
