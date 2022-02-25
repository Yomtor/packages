import React from 'react'
import { Draggable } from './Draggable'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Droppable } from '../Droppable/Droppable'

export default {
    title: 'Atoms/Utils/Draggable',
    component: Draggable,
    argTypes: {
        onEnter: { action: 'clicked' }
    }
} as ComponentMeta<typeof Draggable>

const Template: ComponentStory<typeof Draggable> = ({ children, ...props }) => {
    return (
        <>
            <Draggable {...props}>{children}</Draggable>
            <Droppable>{(status) => 'hola'}</Droppable>
            dasdasdasda
        </>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    children: 'Hola :D',
    phantom: false,
    move: true,
    disabled: false
}
