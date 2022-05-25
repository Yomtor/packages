import React from 'react'
import { NumericField } from './NumericField'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Molecules/Form/NumericField',
    component: NumericField,
    argTypes: {
        // onChange: { action: 'Changed' }
    }
} as ComponentMeta<typeof NumericField>

const Template: ComponentStory<typeof NumericField> = ({
    children,
    ...props
}) => {
    return (
        <div style={{ width: '100px' }}>
            <NumericField {...props}>{children}</NumericField>
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    abs: true,
    integrer: false,
    disabled: false,
    multiple: false,
    draggable: true,
    withArrows: true,
    min: undefined,
    max: undefined,
    mutipleText: 'Multiple',
    label: 'Number',
    prefix: '%',
    suffix: 'm',
    position: 'above',
    align: 'start',
    arrowPosition: 'end'
}
