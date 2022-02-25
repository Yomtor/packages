import { YomtorTheme } from '../types';
import { YomtorColors, YomtorVariants, YomtorGradient } from '../../constants';
declare type ColorVariants = {
    color?: YomtorColors;
    variant: YomtorVariants;
    gradient?: YomtorGradient;
};
declare type Colors = {
    border?: string;
    background?: string;
    color?: string;
    hover?: Colors;
};
export declare type YomtorColorVariant = (variants: ColorVariants) => Colors;
export declare function colorVariant(this: Partial<YomtorTheme>, { color, variant, gradient }: ColorVariants): Colors;
export {};
