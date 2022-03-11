import { createStyles } from '@yomtor/styles'
import { TreeNodeProps } from './TreeNode.props'

export type TreeNodeClasses = 'root'

export const TreeNodeStyles = createStyles<TreeNodeClasses, TreeNodeProps>(
    (_) => ({
        root: {
            width: '100%',
            position: 'absolute',
            top: 0,
            display: 'flex',
            alignItems: 'center'
        }
    })
)
