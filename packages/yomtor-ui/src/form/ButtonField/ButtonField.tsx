import React from 'react'
import { ButtonFieldStyles } from './ButtonField.styles'
import { ButtonFieldProps } from './ButtonField.props'
import { Field } from '../Field'
import { Button } from '../Button'
import { useClearProps } from '../../uses/use-clear-props'

/**
 * Description
 */
export const ButtonField: React.FC<ButtonFieldProps> = ({
    children,
    ...props
}) => {
    const { classes } = ButtonFieldStyles({ ...props })

    return (
        <Field {...props}>
            <div className={classes.root}>
                <Button fullWidth {...useClearProps(props)}>
                    {children}
                </Button>
            </div>
        </Field>
    )
}

ButtonField.defaultProps = {}
