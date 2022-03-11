import { DefaultProps } from '@yomtor/styles'

export type TreeNodeData<T = any> = {
    label?: string
    children?: TreeNodeData[]
} & T

export type TreeNodeProps = DefaultProps & TreeNodeData
