import type { CSSProperties } from 'react'
import { CSSObject } from '../../tss/types'
import { YomtorTheme } from './YomtorTheme'

export type Sx = CSSObject | ((theme: YomtorTheme) => CSSObject)

export type DefaultProps<T extends string = never> = {
    className?: string
    style?: CSSProperties
    sx?: Sx
    classNames?: Partial<Record<T, string>>
    styles?:
        | Partial<Record<T, CSSObject>>
        | ((theme: YomtorTheme) => Partial<Record<T, CSSObject>>)
}
