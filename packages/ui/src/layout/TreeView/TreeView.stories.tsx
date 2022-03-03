import React, { MouseEvent } from 'react'
import { TreeView } from './TreeView'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LockIcon } from '../../icon/Lock/Lock'
import { TreeNodeData, TreeNodeEvent } from './TreeNode/TreeNode.props'
import { Block } from '../Block'
import { Droppable } from '../../utils/Droppable/Droppable'

export default {
    title: 'Atoms/Layout/TreeView',
    component: TreeView,
    argTypes: {}
} as ComponentMeta<typeof TreeView>

const Template: ComponentStory<typeof TreeView> = ({ ...props }) => {
    const clickHandler = (
        event: TreeNodeEvent<TreeNodeData<{ actived: boolean }>>
    ) => {
        event.data.actived = !event.data.actived
    }

    return (
        <Block>
            <div style={{ maxWidth: 400, height: 600 }}>
                <TreeView {...props} onClick={clickHandler} />
            </div>
            <Droppable external>
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
                                : 'rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        Drop Me
                    </div>
                )}
            </Droppable>
        </Block>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    editabled: false,
    collapsed: true,
    draggabled: false,
    sortabled: false,
    data: [
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        },
        {
            name: 'label - 00',
            children: [
                {
                    name: 'label - 01'
                },
                {
                    name: 'label - 11'
                },
                {
                    name: 'label - 21'
                },
                {
                    name: 'label - 31'
                },
                {
                    name: 'label - 41',
                    children: [
                        {
                            name: 'label - 02',
                            children: [
                                {
                                    name: 'label - 02',
                                    children: [
                                        {
                                            name: 'label - 02',
                                            children: [
                                                {
                                                    name: 'label - 12'
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
                    name: 'label - 21'
                }
            ]
        },
        {
            name: 'label - 10'
        }
    ],
    iconFilter: () => <LockIcon />,
    actionFilter: (data, update) => (
        <LockIcon
            onClick={(e: MouseEvent) => {
                data.actived = !data.actived
                update()
                e.stopPropagation()
            }}
        />
    )
}
