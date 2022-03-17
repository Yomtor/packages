import { YomtorTheme, CSSObject } from '@yomtor/styles'

type Props = {
    suffix?: string
    prefix?: string
}

export const root = (theme: YomtorTheme): CSSObject => ({
    background: theme.palette.background.main,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.radius.xs,
    color: theme.palette.text.main,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    placeContent: 'stretch space-between',
    alignItems: 'stretch',
    padding: '0 5px',
    fontSize: theme.typography.fontSizes.sm,
    minHeight: 22
})

export const prefix = (props: Props): CSSObject => ({
    display: 'flex',
    placeContent: 'center center',
    alignItems: 'center',
    transform: 'none !important',
    opacity: 0.5,
    pointerEvents: (props.prefix && 'all') || 'none',
    paddingRight: props.prefix && 5
})

export const suffix = (props: Props): CSSObject => ({
    display: 'flex',
    placeContent: 'center center',
    alignItems: 'center',
    transform: 'none !important',
    opacity: 0.5,
    pointerEvents: (props.suffix && 'all') || 'none',
    paddingLeft: props.suffix && 5
})
