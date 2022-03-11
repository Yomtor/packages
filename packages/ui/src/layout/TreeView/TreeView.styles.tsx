import { createStyles } from '@yomtor/styles'
import { TreeViewProps } from './TreeView.props'

type Classes = 'root' | 'viewport'

export const TreeViewStyles = createStyles<Classes, TreeViewProps>((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        maxHeight: 'inherit',
        maxWidth: 'inherit',
        display: 'flex'
    },
    viewport: {
        position: 'relative'
    }
}))
