import { FieldProps } from '../Field/Field.props'

export type TextFieldProps = {
    prefix?: string
    suffix?: string
} & FieldProps<HTMLInputElement>
