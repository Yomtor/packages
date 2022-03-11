import React from 'react'
import { TreeView } from './TreeView'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Display/TreeView',
    component: TreeView,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof TreeView>

const Template: ComponentStory<typeof TreeView> = ({ ...props }) => {
    return (
        <div style={{ maxWidth: 400, maxHeight: 300 }}>
            <TreeView {...props} />
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    data: [
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        },
        {
            label: 'label - 00',
            children: [
                {
                    label: 'label - 01'
                },
                {
                    label: 'label - 11'
                },
                {
                    label: 'label - 21'
                },
                {
                    label: 'label - 31'
                },
                {
                    label: 'label - 41',
                    children: [
                        {
                            label: 'label - 02',
                            children: [
                                {
                                    label: 'label - 02',
                                    children: [
                                        {
                                            label: 'label - 02',
                                            children: [
                                                {
                                                    label: 'label - 12'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'label - 21'
                }
            ]
        },
        {
            label: 'label - 10'
        }
    ]
}
