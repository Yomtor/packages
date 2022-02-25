import React from 'react'
import { __name__Icon } from './__name__'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/__name__',
    component: __name__Icon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof __name__Icon>

const Template: ComponentStory<typeof __name__Icon> = ({ ...props }) => {
    return <__name__Icon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
