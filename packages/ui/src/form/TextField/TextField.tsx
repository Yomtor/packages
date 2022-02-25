import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { TextFieldStyles } from './TextField.styles'
import { TextFieldProps } from './TextField.props'
import { Field } from '../Field'
import { Input } from '../Input'
import { useClearProps } from '../../uses/use-clear-props'

/**
 * Description
 */
export const TextField: React.FC<TextFieldProps> = ({
    prefix,
    suffix,
    children,
    multiple,
    mutipleText,
    ...props
}) => {
    const [defaultValue, setDefatulValue] = useState(props.defaultValue)
    const { classes } = TextFieldStyles({ prefix, suffix, ...props })
    const input = useRef<HTMLInputElement>()

    useEffect(() => {
        input.current.value = multiple ? '' : defaultValue.toString()
    }, [multiple])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDefatulValue(event.target.value)
        props.onChange && props.onChange(event)
    }

    return (
        <Field {...props}>
            <div className={classes.root}>
                <label className={classes.prefix}>{prefix}</label>
                <Input
                    ref={input}
                    fullWidth
                    {...{
                        ...useClearProps(props),
                        defaultValue,
                        placeholder: multiple ? mutipleText : ''
                    }}
                    onChange={changeHandler}
                />
                <label className={classes.suffix}>{suffix}</label>
            </div>
        </Field>
    )
}

TextField.defaultProps = {
    defaultValue: '',
    mutipleText: 'Multiple'
}
