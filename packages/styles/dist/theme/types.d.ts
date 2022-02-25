import { rgba, Size, YomtorColorVariant } from '.';
import { BreakpointsOptions } from './createBreakpoints';
import { HeadingOptions } from './createHeadings';
import { YomtorPalette, YomtorPaletteColor } from './createPalete';
import { RadiusOptions } from './createRadius';
import { ShadowOptions } from './createShadows';
import { SizesOptions } from './createSizes';
import { SpacingOptions } from './createSpacing';
import { TypographyOptions } from './createTypography';
import type { CSSProperties } from 'react';
import { CSSObject } from '../tss/types';
export declare type Modes = 'light' | 'dark';
export declare type YomtorTheme = {
    palette: YomtorPalette;
    breakpoints: BreakpointsOptions;
    type: Modes;
    shadows: ShadowOptions;
    spacing: SpacingOptions;
    sizes: SizesOptions;
    radius: RadiusOptions;
    debug: boolean;
    headings: HeadingOptions;
    typography: TypographyOptions;
    vars: {
        [key: string]: string;
    };
    fn: {
        size: Size;
        rgba: typeof rgba;
        colorVariant: YomtorColorVariant;
        getContrastText?: (background: string, contrastThreshold?: number) => string;
        augmentColor?: (color: YomtorPaletteColor | string, tonalOffset?: number, contrastThreshold?: number) => YomtorPaletteColor;
    };
};
export declare type DefaultProps<T extends string = never> = {
    className?: string;
    style?: CSSProperties;
    sx?: CSSObject | ((theme: YomtorTheme) => CSSObject);
    classNames?: Partial<Record<T, string>>;
    styles?: Partial<Record<T, CSSObject>> | ((theme: YomtorTheme) => Partial<Record<T, CSSObject>>);
};
