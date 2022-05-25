export const useIntersectRect = (a: DOMRect, b: DOMRect): boolean => {
    return !(
        a.left >= b.right ||
        a.top >= b.bottom ||
        a.right <= b.left ||
        a.bottom <= b.top
    )
}
