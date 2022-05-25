export type AligmentDirectionTypes = 'vertical' | 'horizontal'
export type AligmentTypes = 'start' | 'center' | 'end' | 'distribute'
export type AligmentClickEvent = {
    direction: AligmentDirectionTypes
    aligment: AligmentTypes
}

export type AligmentProps = {
    onClick?: (event: AligmentClickEvent) => {}
}
