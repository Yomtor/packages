import React from 'react'
import { Box } from './Box'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Misc/Box',
    component: Box,
    argTypes: {
        component: { control: 'text' }
    }
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = ({ children, ...props }) => {
    return (
        <Box
            {...props}
            sx={(theme) => ({
                color: theme.palette.primary.main
            })}
        >
            {children}
        </Box>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    component: 'div',
    children: 'dasdasda'
}
