import React from 'react'
import { AligmentStyles } from './Aligment.styles'
import {
    AligmentDirectionTypes,
    AligmentProps,
    AligmentTypes
} from './Aligment.props'
import { Block } from '../../layout/Block'
import { MoreIcon } from '../../icon/More'
import { DistributeIcon } from '../../icon/Distribute'
import { ArrageIcon } from '../../icon/Arrage'
import { CenterIcon } from '../../icon/Center'
import { Button } from '../../form/Button'

/**
 * Description
 */
export const Aligment: React.FC<AligmentProps> = ({
    children,
    onClick,
    ...props
}) => {
    const { classes } = AligmentStyles({ ...props })

    const changeHandler = (
        direction: AligmentDirectionTypes,
        aligment: AligmentTypes
    ) => {
        onClick &&
            onClick({
                direction,
                aligment
            })
    }

    return (
        <div className={classes.root}>
            <Block gap={0} margin={0} padding={5}>
                <Button
                    onClick={() => changeHandler('horizontal', 'distribute')}
                >
                    <DistributeIcon />
                </Button>
                <Button onClick={() => changeHandler('vertical', 'distribute')}>
                    <DistributeIcon rotate={90} />
                </Button>
                <MoreIcon />
                <Button onClick={() => changeHandler('horizontal', 'start')}>
                    <ArrageIcon />
                </Button>
                <Button onClick={() => changeHandler('horizontal', 'center')}>
                    <CenterIcon rotate={90} />
                </Button>
                <Button onClick={() => changeHandler('horizontal', 'end')}>
                    <ArrageIcon rotate={180} />
                </Button>
                <Button onClick={() => changeHandler('vertical', 'start')}>
                    <ArrageIcon rotate={90} />
                </Button>
                <Button onClick={() => changeHandler('vertical', 'center')}>
                    <CenterIcon />
                </Button>
                <Button onClick={() => changeHandler('vertical', 'end')}>
                    <ArrageIcon rotate={270} />
                </Button>
            </Block>
        </div>
    )
}

Aligment.defaultProps = {}
