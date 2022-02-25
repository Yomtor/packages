import React from 'react'
import { HideIcon } from './Hide'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Hide',
    component: HideIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof HideIcon>

const Template: ComponentStory<typeof HideIcon> = ({ ...props }) => {
    return <HideIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
