export default (
    word: string
): { hue: number; saturation: number; lightness: number } => {
    let hash = 0
    for (let i = 0; i < word.length; i++) {
        hash = word.charCodeAt(i) + ((hash << 5) - hash)
    }

    return { hue: hash % 360, saturation: 0.7, lightness: 0.5 }
}
