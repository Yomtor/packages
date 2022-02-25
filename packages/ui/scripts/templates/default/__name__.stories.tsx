import React from 'react'
import { __name__ } from './__name__'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: '__atomicity__(pascalCase)s/__folder__(pascalCase)/__name__',
    component: __name__,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof __name__>

const Template: ComponentStory<typeof __name__> = ({ children, ...props }) => {
    return <__name__ {...props}>{children}</__name__>
}

export const Playground = Template.bind({})

Playground.args = {
    color: 'red'
}
