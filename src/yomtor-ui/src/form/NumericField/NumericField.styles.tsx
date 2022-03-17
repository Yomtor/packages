import { createStyles } from '@yomtor/styles'
import { prefix, root, suffix } from '../global.styles'
import { NumericFieldProps } from './NumericField.props'

type Classes = 'root' | 'prefix' | 'suffix' | 'arrows'

export const NumericFieldStyles = createStyles<
    Classes,
    NumericFieldProps & { showArrows: boolean; focused: boolean }
>((theme, { arrowPosition, showArrows, withArrows, focused, ...props }) => ({
    root: {
        ...root(theme)
    },
    prefix: {
        ...prefix(props),
        minWidth:
            arrowPosition === 'start' &&
            showArrows &&
            withArrows &&
            !focused &&
            15,
        fontSize:
            !focused && showArrows && withArrows && arrowPosition === 'start'
                ? 0
                : null
    },
    suffix: {
        ...suffix(props),
        minWidth:
            arrowPosition === 'end' &&
            showArrows &&
            withArrows &&
            !focused &&
            15,
        fontSize:
            !focused && showArrows && arrowPosition === 'end' && withArrows
                ? 0
                : null
    },
    arrows: {
        position: 'absolute',
        width: 18,
        right: arrowPosition === 'end' && 0,
        left: arrowPosition === 'start' && 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        alignItems: 'stretch',
        background: theme.palette.background.main,
        borderRight:
            arrowPosition === 'start' && `1px solid ${theme.palette.divider}`,
        borderLeft:
            arrowPosition === 'end' && `1px solid ${theme.palette.divider}`,
        fontSize: 7,
        cursor: 'pointer',
        opacity: !focused && showArrows ? 1 : 0,
        pointerEvents: !focused && showArrows ? 'all' : 'none',
        '& > button': {
            flex: '1 1 50%',
            maxHeight: '50%',
            minHeight: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }
    }
}))
