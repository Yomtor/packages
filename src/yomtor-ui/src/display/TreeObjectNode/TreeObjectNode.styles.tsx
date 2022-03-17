import { createStyles } from '@yomtor/styles'
import { TreeObjectProps } from './TreeObjectNode.props'

type Classes = 'root' | 'actions' | 'label'

export const TreeObjectNodeStyles = createStyles<
    Classes,
    Omit<TreeObjectProps, 'node'>
>((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        padding: theme.spacing.xs,
        gap: 8
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: 5
    }
}))
