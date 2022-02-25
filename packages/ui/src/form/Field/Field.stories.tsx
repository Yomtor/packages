import React from 'react'
import { Field } from './Field'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Form/Field',
    component: Field,
    argTypes: {
        onDrag: { action: 'Dragged' },
        value: { table: { disable: true } },
        multiple: { table: { disable: true } }
    }
} as ComponentMeta<typeof Field>

const Template: ComponentStory<typeof Field> = ({ children, ...props }) => {
    return <Field {...props}>{children}</Field>
}

export const Playground = Template.bind({})

Playground.args = {
    label: 'TextLabel',
    position: 'above',
    align: 'start',
    draggable: false,
    disabled: false,
    children: <input />
}
