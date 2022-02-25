import React from 'react'
import { ButtonField } from './ButtonField'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GroupIcon } from '../../icon/Group'

export default {
    title: 'Molecules/Form/ButtonField',
    component: ButtonField,
    argTypes: {
        onClick: { action: 'Clicked' }
    }
} as ComponentMeta<typeof ButtonField>

const Template: ComponentStory<typeof ButtonField> = ({
    children,
    ...props
}) => {
    return <ButtonField {...props}>{children}</ButtonField>
}

export const Playground = Template.bind({})

Playground.args = {
    children: <GroupIcon />
}
