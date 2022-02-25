import { NumericFieldProps } from './NumericField.props'

export const useValid = ({ abs, integrer }: NumericFieldProps, value: any) => {
    let pattern = '^'
    pattern += !abs ? '-?' : ''
    pattern += '\\d*'
    pattern += !integrer ? '([.|,]?\\d+)?' : ''
    pattern += '$'

    const regexp = new RegExp(pattern)
    return regexp.exec(value)
}
