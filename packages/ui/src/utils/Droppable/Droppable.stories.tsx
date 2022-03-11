import React from 'react'
import { Droppable } from './Droppable'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Draggable } from '../Draggable'
import { DropEvent } from './Droppable.props'

export default {
    title: 'Atoms/Utils/Droppable',
    component: Droppable,
    argTypes: {
        name: { control: 'text' }
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Droppable>

const Template: ComponentStory<any> = ({ children, name, ...props }) => {
    return (
        <>
            <Draggable data={{ name }}>
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
            <Draggable>
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
            <Droppable {...props}>
                {(status) => (
                    <div
                        style={{
                            height: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            background: status.accepted
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
    disabled: false,
    name: 'acceptme',
    accept: [
        'image/png',
        (event: DropEvent) => event.props.data?.name === 'acceptme'
    ],
    multiple: true,
    external: true
}
