import React from 'react'
import { __name__Styles } from './__name__.styles'
import { __name__Props } from './__name__.props'

/**
 * Description
 */
export const __name__: React.FC<__name__Props> = ({
    classNames,
    children,
    ...props
}) => {
    const { classes, cx } = __name__Styles(
        { ...props },
        { name: '__name__', classNames }
    )

    return (
        <div className={classes.root} {...props}>
            {children}
        </div>
    )
}

__name__.defaultProps = {
    color: 'red'
}
