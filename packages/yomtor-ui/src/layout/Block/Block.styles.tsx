import { createStyles } from '@yomtor/styles'
import { isUndefined } from 'lodash'
import { BlockProps } from './Block.props'

type Classes = 'root'

export const BlockStyles = createStyles<Classes, BlockProps>(
    (_, { padding, margin, actived, gap }) => ({
        root: {
            width: '100%',
            height: 'inherit',
            minHeight: 'inherit',
            maxHeight: 'inherit',
            display: 'flex',
            boxSizing: 'border-box',
            placeContent: 'center space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: `0 ${padding}px`,
            margin: `${margin}px 0`,
            gap: gap,
            pointerEvents:
                (!isUndefined(actived) && (actived ? 'all' : 'none')) || false,
            '& > *': {
                width: '100%'
            }
        }
    })
)
