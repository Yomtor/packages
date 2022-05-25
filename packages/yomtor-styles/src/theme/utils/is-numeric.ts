export const isNumeric = (num: number | string | undefined): boolean => {
    if (!num) return false
    return !isNaN(+num)
}
