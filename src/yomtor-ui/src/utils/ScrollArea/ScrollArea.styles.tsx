import { createStyles } from '@yomtor/styles'

type Classes = 'root' | 'viewport' | 'scrollbar' | 'thumb' | 'corner'

export const ScrollAreaStyles = createStyles<
    Classes,
    {
        scrollbarSize: number
        offsetScrollbars: boolean
        scrollbarHovered: boolean
    }
>((theme, { offsetScrollbars, scrollbarSize, scrollbarHovered }, getRef) => {
    const thumb = getRef('thumb')

    return {
        root: {
            overflow: 'hidden',
            minWidth: '100%'
        },

        viewport: {
            width: '100%',
            height: '100%',
            paddingRight: offsetScrollbars ? scrollbarSize : undefined
        },

        scrollbar: {
            display: 'flex',
            userSelect: 'none',
            touchAction: 'none',
            boxSizing: 'border-box',
            padding: scrollbarSize / 5,
            transition: 'background-color 150ms ease, opacity 150ms ease',

            '&:hover': {
                backgroundColor: theme.palette.background.darkest,
                [`& .${thumb}`]: {
                    backgroundColor: theme.palette.divider
                }
            },

            '&[data-orientation="vertical"]': {
                width: scrollbarSize
            },

            '&[data-orientation="horizontal"]': {
                flexDirection: 'column',
                height: scrollbarSize
            },

            '&[data-state="hidden"]': {
                opacity: 0
            }
        },

        thumb: {
            ref: thumb,
            flex: 1,
            backgroundColor: theme.palette.divider,
            borderRadius: scrollbarSize,
            position: 'relative',
            transition: 'background-color 150ms ease',

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                minWidth: 44,
                minHeight: 44
            }
        },

        corner: {
            backgroundColor: theme.palette.background.lightest,
            transition: 'opacity 150ms ease',
            opacity: scrollbarHovered ? 1 : 0
        }
    }
})
