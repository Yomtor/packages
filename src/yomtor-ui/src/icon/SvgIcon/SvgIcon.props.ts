import { MouseEventHandler } from 'react'

export type SvgIconProps = {
    rotate?: number
    viewport?: string
    hidden?: boolean
    onClick?: MouseEventHandler<SVGSVGElement>
}
