import { createStyles } from '@yomtor/styles'
import { SvgIconProps } from './SvgIcon.props'

type Classes = 'root'

export const SvgIconStyles = createStyles<Classes, SvgIconProps>(
    (_, { hidden, rotate }) => ({
        root: {
            color: 'inherit',
            fontSize: 'inherit',
            boxSizing: 'content-box',
            fill: 'currentcolor',
            fillOpacity: 1,
            stroke: 'currentcolor',
            strokeOpacity: 0,
            width: '1em !important',
            height: '1em  !important',
            display: hidden ? 'none' : 'inline-block',
            flexShrink: 0,
            userSelect: 'none',
            transform: rotate && `rotate(${rotate}deg)`
        }
    })
)
