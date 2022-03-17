import React from 'react'
import { Section } from './Section'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Layout/Section',
    component: Section,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Section>

const Template: ComponentStory<typeof Section> = ({ children, ...props }) => {
    return <Section {...props}>{children}</Section>
}

export const Playground = Template.bind({})

Playground.args = {}
