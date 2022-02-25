import React from 'react'
import { LockIcon } from './Lock'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Lock',
    component: LockIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof LockIcon>

const Template: ComponentStory<typeof LockIcon> = ({ ...props }) => {
    return <LockIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
