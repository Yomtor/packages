import React from 'react'
import { Droppable } from './Droppable'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Utils/Droppable',
    component: Droppable,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Droppable>

const Template: ComponentStory<typeof Droppable> = ({ children, ...props }) => {
    return (
        <>
            <Droppable {...props}>
                {(status) => <>test{status.accepted ? 'se' : 'no'}</>}
            </Droppable>
        </>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    accept: ['png'],
    multiple: true
}
