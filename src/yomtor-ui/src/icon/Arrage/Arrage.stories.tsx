import React from 'react'
import { ArrageIcon } from './Arrage'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Arrage',
    component: ArrageIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof ArrageIcon>

const Template: ComponentStory<typeof ArrageIcon> = ({ ...props }) => {
    return <ArrageIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
