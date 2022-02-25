import { YomtorTheme } from './types';
import { YomtorLevels } from '../constants';
export declare let dark: YomtorPalette;
export declare let light: YomtorPalette;
export declare type YomtorPaletteColor = {
    lightest: string;
    light: string;
    main: string;
    strong: string;
    strongest: string;
    text: string;
};
export declare type TypeAction = {
    active?: string;
    hover?: string;
    hoverOpacity?: number;
    selected?: string;
    selectedOpacity?: number;
    disabled?: string;
    disabledOpacity?: number;
    disabledBackground?: string;
    focus?: string;
    focusOpacity?: number;
    activatedOpacity?: number;
};
export declare type TypeBackground = {
    default?: string;
    paper?: string;
};
export declare type TypeDivider = string;
export declare type TypeText = {
    main?: string;
    disabled?: string;
    icon?: string;
};
export declare type YomtorPalette = {
    primary?: YomtorPaletteColor;
    secondary?: YomtorPaletteColor;
    error?: YomtorPaletteColor;
    warning?: YomtorPaletteColor;
    info?: YomtorPaletteColor;
    success?: YomtorPaletteColor;
    mode?: 'light' | 'dark';
    contrastThreshold?: number;
    tonalOffset?: number;
    divider?: TypeDivider;
    action?: TypeAction;
    logo?: YomtorPaletteColor;
    white?: string;
    black?: string;
    text?: Record<YomtorLevels, string>;
    background?: Record<YomtorLevels, string>;
    getContrastText?: (background: string, contrastThreshold?: number) => string;
    augmentColor?: (color: YomtorPaletteColor | string, tonalOffset?: number, contrastThreshold?: number) => YomtorPaletteColor;
};
export declare type YomtorColor = {
    color?: YomtorPaletteColor;
    name?: string;
};
export declare function getContrastText(this: YomtorTheme, background: string, contrastThreshold?: number): string;
export declare const augmentColor: (color: any, tonalOffset?: number, contrastThreshold?: number) => YomtorPaletteColor;
export default function createPalette(palette: YomtorPalette): YomtorPalette;
