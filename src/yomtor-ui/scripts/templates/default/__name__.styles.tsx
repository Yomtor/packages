import { createStyles } from '@yomtor/styles'
import { __name__Props } from './__name__.props'

type Classes = 'root'

export const __name__Styles = createStyles<Classes, __name__Props>(
    (theme, { color }) => ({
        root: {
            color: color
        }
    })
)
