import React from 'react'
import { Container } from './Container'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    backgrounds: { disable: true },
}

export const decorators = [
    (Story) => (
        <Container>
            <Story />
        </Container>
    )
]
