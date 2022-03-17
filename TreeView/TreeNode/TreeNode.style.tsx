import { createStyles } from '@yomtor/styles'
import { TreeNodeProps } from './TreeNode.props'

export type TreeNodeClasses = 'below' | 'above' | 'childrenBelow'

export const TreeNodeStyles = createStyles<TreeNodeClasses, TreeNodeProps>(
    (_, { data, depth }) => ({
        above: {
            top: data.children ? -7 : 0,
            height: data.children ? 14 : '50%',
            '& > div': {
                left: depth * 20 + 19,
                top: data.children ? 6 : -1
            }
        },
        below: {
            bottom: data.children ? -7 : 0,
            height: data.children ? 14 : '50%',
            '& > div': {
                left: depth * 20 + 19,
                bottom: data.children ? 6 : -1
            }
        },
        childrenBelow: {
            height: 14,
            left: depth * 20 + 40,
            zIndex: depth + 2,
            '& > div': {
                bottom: data.children ? 6 : -1
            }
        }
    })
)
