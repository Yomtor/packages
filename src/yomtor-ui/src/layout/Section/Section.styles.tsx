import { createStyles } from '@yomtor/styles'
import { isUndefined } from 'lodash'
import { SectionProps } from './Section.props'

type Classes = 'root'

export const SectionStyles = createStyles<Classes, SectionProps>(
    (_, { actived }) => ({
        root: {
            pointerEvents: !isUndefined(actived) && actived ? 'all' : 'none'
        }
    })
)
