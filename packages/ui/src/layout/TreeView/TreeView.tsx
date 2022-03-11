import React, { Fragment, ReactNode, useEffect, useState, useRef } from 'react'
import { TreeViewStyles } from './TreeView.styles'
import { TreeViewProps } from './TreeView.props'
import { TreeNode } from './TreeNode/TreeNode'
import { TreeNodeData } from './TreeNode/TreeNode.props'
import { ScrollArea } from '../../utils/ScrollArea'
import { ScrollAreaEvent } from '../../utils/ScrollArea/ScrollArea.props'

/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
    classNames,
    nodeComponent = TreeNode,
    nodeHeight = 0,
    collapsed = false,
    data,
    ...props
}) => {
    const [height, setHeight] = useState<number>()
    const [viewport, setViewport] = useState<DOMRect>()
    const nodeRefs = useRef<HTMLElement[]>([])
    const viewportRef = useRef<HTMLDivElement>()
    const wrapperRef = useRef<HTMLDivElement>()
    const nodeHeightRef = useRef<number>(nodeHeight)
    const { classes } = TreeViewStyles(
        { ...props },
        { name: 'TreeView', classNames }
    )

    useEffect(() => {
        if (!nodeHeightRef.current) {
            nodeRefs.current.forEach((node) => {
                if (
                    nodeHeightRef.current < node.getBoundingClientRect().height
                ) {
                    nodeHeightRef.current = node.getBoundingClientRect().height
                }
            })
        }
    }, [])

    useEffect(() => {
        setHeight(nodeHeightRef.current * nodeRefs.current.length)
    }, [data])

    const childEvents = (data: TreeNodeData) => ({
        onClick: () => {
            console.log(data)
        }
    })

    const scrollHandler = (event: ScrollAreaEvent) => {
        console.log(wrapperRef.current.clientHeight)
        console.log(event)
    }

    let index = -1
    let key = -1
    const nodes = (children: TreeNodeData[], depth = 0): ReactNode =>
        children.map(({ children, ...others }) => {
            key++

            return (
                <Fragment key={key}>
                    <TreeNode
                        ref={(node: HTMLElement) =>
                            (nodeRefs.current[index++] = node)
                        }
                        {...others}
                        {...childEvents(others)}
                        style={{ top: key * nodeHeightRef.current }}
                    />
                    {children &&
                        children.length &&
                        !collapsed &&
                        nodes(children, depth + 1)}
                </Fragment>
            )
        })

    console.log(viewport)
    nodeRefs.current = []
    return (
        <div {...props} className={classes.root}>
            <ScrollArea ref={wrapperRef} onScroll={scrollHandler}>
                <div
                    ref={viewportRef}
                    className={classes.viewport}
                    style={{ height }}
                >
                    {nodes(data)}
                </div>
            </ScrollArea>
        </div>
    )
}

TreeView.defaultProps = {}
