import React from 'react'
import { DistributeIcon } from './Distribute'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/Distribute',
    component: DistributeIcon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof DistributeIcon>

const Template: ComponentStory<typeof DistributeIcon> = ({ ...props }) => {
    return <DistributeIcon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
