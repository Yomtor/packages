import React from 'react'
import { ArtboardIcon } from './Artboard'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Artboard',
    component: ArtboardIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof ArtboardIcon>

const Template: ComponentStory<typeof ArtboardIcon> = ({ ...props }) => {
    return <ArtboardIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
