import React, { memo, forwardRef } from 'react'
import { SvgIcon, SvgIconProps } from '../icon/SvgIcon'

export const createSvgIcon = (path: JSX.Element, displayName: string) => {
    const Component = (props: any, ref: any) => (
        <SvgIcon {...props} ref={ref}>
            {path}
        </SvgIcon>
    )

    if (process.env.NODE_ENV !== 'production') {
        // Need to set `displayName` on the inner component for React.memo.
        // React prior to 16.14 ignores `displayName` on the wrapper.
        Component.displayName = `${displayName}Icon`
    }

    return memo(forwardRef<unknown, SvgIconProps>(Component))
}
