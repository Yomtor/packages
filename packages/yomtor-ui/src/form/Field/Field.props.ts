import React from 'react'
import { DraggableEventHandler } from 'react-draggable'

export type FieldProps<T = any> = {
    multiple?: boolean
    label?: string
    position?: 'above' | 'below'
    align?: 'start' | 'center' | 'end'
    draggable?: boolean
    disabled?: boolean
    mutipleText?: string
    onDrag?: DraggableEventHandler
} & React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T>
