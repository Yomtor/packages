import React from 'react'
import { Stack } from './Stack'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { YOMTOR_SIZES } from '@yomtor/styles'
import { YOMTOR_STACK_ALIGNS, YOMTOR_STACK_JUSTIFIES } from './Stack.props'

export default {
    title: 'Atoms/Layout/Stack',
    component: Stack,
    argTypes: {
        spacing: { control: { type: 'radio', options: YOMTOR_SIZES } },
        align: {
            control: {
                type: 'radio',
                options: YOMTOR_STACK_ALIGNS
            }
        },
        justify: {
            control: {
                type: 'radio',
                options: YOMTOR_STACK_JUSTIFIES
            }
        }
    }
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = ({ children, ...props }) => {
    return <Stack {...props}>dasda</Stack>
}

export const Playground = Template.bind({})

Playground.args = {
    spacing: 'md',
    align: 'top',
    justify: 'md'
}
