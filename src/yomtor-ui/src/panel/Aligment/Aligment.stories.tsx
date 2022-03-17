import React from 'react'
import { Aligment } from './Aligment'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Organisms/Panel/Aligment',
    component: Aligment,
    argTypes: {
        onClick: { action: 'Clicked' }
    }
} as ComponentMeta<typeof Aligment>

const Template: ComponentStory<typeof Aligment> = ({ children, ...props }) => {
    return <Aligment {...props}>{children}</Aligment>
}

export const Playground = Template.bind({})

Playground.args = {}
