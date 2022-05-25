import React, { forwardRef } from 'react'
import { useClearProps } from '../../../uses/use-clear-props'
import { TreeNodeProps } from './TreeNode.props'
import { TreeNodeStyles } from './TreeNode.style'

export const TreeNode = forwardRef<HTMLDivElement, TreeNodeProps>(
    ({ classNames, node, ...props }, ref) => {
        const { classes } = TreeNodeStyles(
            { ...props },
            { name: 'TreeNode', classNames }
        )
        return (
            <div ref={ref} {...useClearProps(props)} className={classes.root}>
                {node.label}
            </div>
        )
    }
)

TreeNode.defaultProps = {
    collapsed: false
}
