import { createStyles, YomtorTheme, CSSObject } from '@yomtor/styles'
import { TreeViewProps } from './TreeView.props'

const getIndicators = (theme: YomtorTheme): CSSObject => ({
    position: 'absolute',
    right: 0,
    height: 2,
    background: theme.palette.text.main,
    boxSizing: 'border-box',
    zIndex: 1
})

const getDroppers = (theme: YomtorTheme): CSSObject => ({
    position: 'absolute',
    right: 0,
    boxSizing: 'border-box',
    left: 0,
    zIndex: 1,
    '& > div': { ...getIndicators(theme) }
})

type Classes =
    | 'root'
    | 'wrapper'
    | 'node'
    | 'icon'
    | 'label'
    | 'actived'
    | 'highlighted'
    | 'actions'
    | 'collapser'
    | 'above'
    | 'below'
    | 'childrenBelow'
    | 'phantom'

export const TreeViewStyles = createStyles<Classes, TreeViewProps>((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        overflow: 'auto'
    },
    wrapper: {
        overflow: 'hidden'
    },
    node: {
        userSelect: 'none',
        position: 'relative'
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        alignItems: 'center',
        height: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingRight: 10,
        // transform: 'none !important',
        boxSizing: 'border-box',

        borderColor: 'transparent',
        '& label, & div, & input': {
            flex: '1 1 100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 12
        },
        '& input': {
            background: theme.palette.background.main,
            color: theme.palette.text.main,
            padding: 5,
            marginLeft: -5
        }
    },
    phantom: {
        pointerEvents: 'none',
        transform: 'inherit',
        position: 'absolute',
        left: 0,
        right: 0,
        color: theme.palette.text.main
    },
    actived: {
        color: theme.fn.getContrastText(theme.palette.primary.strong),
        background: theme.palette.primary.strong
    },
    highlighted: {
        borderColor: theme.palette.primary.strong
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        alignItems: 'center',
        '& > *': {
            display: 'flex',
            marginLeft: 7
        }
    },
    collapser: {
        display: 'flex',
        width: 15,
        visibility: 'hidden',
        fontSize: 8,
        opacity: 0.5,
        height: '100%',
        alignItems: 'center',
        cursor: 'pointer'
    },
    above: getDroppers(theme),
    below: getDroppers(theme),
    childrenBelow: {
        ...getDroppers(theme),
        bottom: -7,
        '& div': {
            ...getIndicators(theme),
            right: 0,
            left: -1
        }
    }
}))
