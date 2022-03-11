import React, { forwardRef } from 'react'
import { TreeNodeProps } from './TreeNode.props'
import { TreeNodeStyles } from './TreeNode.style'

export const TreeNode = forwardRef<HTMLElement, TreeNodeProps>(
    ({ classNames, ...props }, ref) => {
        const { classes } = TreeNodeStyles(
            { ...props },
            { name: 'TreeNode', classNames }
        )

        return (
            <div ref={ref} {...props} className={classes.root}>
                {props.label}
            </div>
        )
    }
)
