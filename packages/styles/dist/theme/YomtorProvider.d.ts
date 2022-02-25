import React from 'react';
import type { Options as EmotionCacheOptions } from '@emotion/cache';
import type { CSSObject } from '../tss/types';
import { YomtorTheme } from './types';
import { Modes } from '.';
declare type ProviderStyles = Record<string, Record<string, CSSObject> | ((theme: YomtorTheme) => Record<string, CSSObject>)>;
export declare function useYomtorTheme(): YomtorTheme;
export declare function useYomtorThemeStyles(): Record<string, Record<string, CSSObject> | ((theme: YomtorTheme) => Record<string, CSSObject>)>;
export declare function useYomtorMode(): Modes;
export declare function useYomtorEmotionOptions(): EmotionCacheOptions;
export interface YomtorProviderProps {
    theme?: YomtorTheme;
    styles?: ProviderStyles;
    emotionOptions?: EmotionCacheOptions;
    withNormalizeCSS?: boolean;
    withGlobalStyles?: boolean;
    children: React.ReactNode;
}
export declare function YomtorProvider({ theme, styles, emotionOptions, withNormalizeCSS, withGlobalStyles, children }: YomtorProviderProps): JSX.Element;
export declare namespace YomtorProvider {
    var displayName: string;
}
export {};
