import React from 'react'
import { ScrollArea } from './ScrollArea'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Utils/ScrollArea',
    component: ScrollArea,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof ScrollArea>

const Template: ComponentStory<typeof ScrollArea> = ({
    children,
    ...props
}) => {
    return (
        <div
            style={{
                padding: 40,
                maxHeight: 300,
                maxWidth: 300,
                display: 'flex'
            }}
        >
            <ScrollArea {...props}>{children}</ScrollArea>
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    scrollbarSize: 10,
    scrollHideDelay: 1000,
    type: 'hover',
    offsetScrollbars: false,
    children: Array(10)
        .fill(0)
        .map((_, index) => (
            <p key={index} style={{ width: '200%' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                qui minima, voluptates aperiam labore delectus consequuntur
                tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio
                accusamus veniam sit hic.
            </p>
        ))
}
