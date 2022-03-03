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
            <Draggable {...props}>
                <span
                    style={{
                        height: 40,
                        width: 150,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        cursor: 'pointer',
                        background: 'rgba(255, 255, 255, 0.3)'
                    }}
                >
                    Drag Me
                </span>
            </Draggable>
            <Droppable>
                {(status) => (
                    <div
                        style={{
                            height: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            background: status.overed
                                ? 'rgba(0, 255, 0, 0.4)'
                                : status.rejected
                                ? 'rgba(255, 0, 0, 0.4)'
                                : 'rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        Drop Me
                    </div>
                )}
            </Droppable>
        </>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    phantom: false,
    move: true,
    disabled: false,
    axis: 'y',
    throttle: 1,
    start: 5
}
