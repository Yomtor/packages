import React from 'react'
import { TextField } from './TextField'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Molecules/Form/TextField',
    component: TextField,
    argTypes: {
        onChange: { action: 'onChange' },
        onDrag: { action: 'onDrag' }
    }
} as ComponentMeta<typeof TextField>

const Template: ComponentStory<typeof TextField> = ({ children, ...props }) => {
    return <TextField {...props}>{children}</TextField>
}

export const Playground = Template.bind({})

Playground.args = {
    disabled: false,
    multiple: false,
    label: 'Number',
    prefix: '%',
    suffix: 'm',
    position: 'above',
    align: 'start',
    defaultValue: ''
}
