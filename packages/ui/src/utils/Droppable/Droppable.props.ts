import { ReactNode } from 'react'
import { DefaultProps } from '@yomtor/styles'
import { FileRejection } from 'react-dropzone'

export type DropzoneStatus = {
    accepted: boolean
    rejected: boolean
    overed: boolean
    dragged: boolean
}

export type DropEvent<D = any> = {
    type: string
    fileRejections?: FileRejection[]
    props: D
    files?: File[]
    defaultEvent?: Event
}

export type DroppableProps = DefaultProps & {
    onDrop?: (data: DropEvent) => void | false
    onEnter?: (event: DropEvent) => void | false
    onLeave?: (event: DropEvent) => void | false
    onReject?(fileRejections: FileRejection[]): void
    children?: ((status: DropzoneStatus) => ReactNode) | ReactNode
    accept?: (string | ((event: DropEvent) => boolean))[]
    multiple?: boolean
    maxSize?: number
    disabled?: boolean
    loading?: boolean
    click?: boolean
    external?: boolean
}
