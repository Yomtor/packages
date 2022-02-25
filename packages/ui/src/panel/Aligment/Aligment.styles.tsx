import { createStyles } from '@yomtor/styles'
import { AligmentProps } from './Aligment.props'

type Classes = 'root'

export const AligmentStyles = createStyles<Classes, AligmentProps>((theme) => ({
    root: {
        background: theme.palette.background.main,
        padding: '5px 0'
    }
}))
