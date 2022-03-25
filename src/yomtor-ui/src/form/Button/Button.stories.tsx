import React from 'react'
import { Button } from './Button'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Form/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'Clicked' }
    }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({ fullWidth, ...props }) => {
    return <Button {...props}>Button</Button>
}

export const Playground = Template.bind({})

Playground.args = {
    fullWidth: false
}
