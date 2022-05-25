import { createStyles } from '@yomtor/styles'
import { TreeNodeProps } from './TreeNode.props'

export type TreeNodeClasses = 'root'

export const TreeNodeStyles = createStyles<TreeNodeClasses, TreeNodeProps>(
    (theme) => ({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center'
        }
    })
)
