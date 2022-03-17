import React from 'react'
import { CenterIcon } from './Center'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Center',
    component: CenterIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof CenterIcon>

const Template: ComponentStory<typeof CenterIcon> = ({ ...props }) => {
    return <CenterIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
