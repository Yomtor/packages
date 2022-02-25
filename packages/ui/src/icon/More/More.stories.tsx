import React from 'react'
import { MoreIcon } from './More'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/More',
    component: MoreIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof MoreIcon>

const Template: ComponentStory<typeof MoreIcon> = ({ ...props }) => {
    return <MoreIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
