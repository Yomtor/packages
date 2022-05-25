import React from 'react'
import { PlayIcon } from './Play'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Play',
    component: PlayIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof PlayIcon>

const Template: ComponentStory<typeof PlayIcon> = ({ ...props }) => {
    return <PlayIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
