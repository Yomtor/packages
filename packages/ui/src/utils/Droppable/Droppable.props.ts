import { DefaultProps } from '@yomtor/styles'
import { FileRejection } from 'react-dropzone'

export type DropzoneStatus = {
    accepted: boolean
    rejected: boolean
    overed: boolean
    dragged: boolean
}

export type DragFileEvent = {
    files: File[]
    type: string
}

export type DroppableProps = DefaultProps & {
    onDrop?: (data: DragFileEvent | Event) => void | false
    onMove?: () => void | false
    onEnter?: () => void | false
    onLeave?: () => void | false
    onReject?(fileRejections: FileRejection[]): void
    children?: (status: DropzoneStatus) => React.ReactNode
    accept?: string[]
    multiple?: boolean
    maxSize?: number
    disabled?: boolean
    loading?: boolean
    click?: boolean
    external?: boolean
}
