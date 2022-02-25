import React from 'react'
import { Block } from './Block'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NumericField } from '../../form/NumericField'
import { LockIcon } from '../../icon/Lock/Lock'

export default {
    title: 'Atoms/Layout/Block',
    component: Block,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Block>

const Template: ComponentStory<typeof Block> = ({ children, ...props }) => {
    return (
        <Block {...props}>
            <NumericField label='label' />
            <LockIcon />
            <NumericField label='label' />
            <NumericField label='label' />
        </Block>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
