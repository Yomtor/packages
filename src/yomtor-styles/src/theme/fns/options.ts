import { isArray } from 'lodash'

export type YomtorOptions = {
    label: string
    value: any
}[]

export const toKeyValue = (
    options: { [key: string]: string } | Array<string | number>
): YomtorOptions => {
    if (isArray(options)) {
        return options.map((label, key) => ({
            value: key,
            label: label.toString()
        }))
    }

    return Object.keys(options).map((key) => ({
        label: options[key],
        value: key
    }))
}
