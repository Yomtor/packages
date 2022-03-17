import { FieldProps } from '../Field/Field.props'

export type NumericFieldProps = {
    prefix?: string
    suffix?: string
    abs?: boolean
    integrer?: boolean
    max?: number
    min?: number
    withArrows?: boolean
    arrowPosition?: 'start' | 'end'
} & FieldProps<HTMLInputElement>
