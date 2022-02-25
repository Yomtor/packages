import React from 'react'
import { ArrowIcon } from './Arrow'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Arrow',
    component: ArrowIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof ArrowIcon>

const Template: ComponentStory<typeof ArrowIcon> = ({ ...props }) => {
    return <ArrowIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
