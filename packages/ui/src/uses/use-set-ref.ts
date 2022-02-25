import { MutableRefObject } from 'react'

export const useSetRef = <T extends HTMLElement>(
    node: T,
    refNode: MutableRefObject<T>,
    ref: ((instance: T) => void) | React.MutableRefObject<T>
) => {
    refNode.current = node
    if (typeof ref === 'function') {
        ref(node)
    } else if (ref) {
        ref.current = node
    }
}
