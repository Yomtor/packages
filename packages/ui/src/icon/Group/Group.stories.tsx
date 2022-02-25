import React from 'react'
import { GroupIcon } from './Group'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Group',
    component: GroupIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof GroupIcon>

const Template: ComponentStory<typeof GroupIcon> = ({ ...props }) => {
    return <GroupIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
