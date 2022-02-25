export declare function hexToRgb(color: string): string;
export declare function rgbToHex(color: string): string;
export declare function hslToRgb(color: any): string;
export declare type DecomposedColor = {
    type?: string;
    values?: number[];
    colorSpace?: any;
};
export declare function decomposeColor(color: DecomposedColor): DecomposedColor;
export declare function decomposeColor(color: string): DecomposedColor;
export declare function recomposeColor(color: DecomposedColor): string;
export declare function getContrastRatio(foreground: string, background: string): number;
export declare function getLuminance(color: string): number;
export declare function getLuminance(color: DecomposedColor): number;
export declare function emphasize(color: string, coefficient?: number): string;
export declare function alpha(color: string, value: number): string;
export declare function alpha(color: DecomposedColor, value: number): string;
export declare function darken(color: string, coefficient?: number): string;
export declare function darken(color: DecomposedColor, coefficient?: number): string;
export declare function lighten(color: string, coefficient?: number): string;
export declare function lighten(color: DecomposedColor, coefficient?: number): string;
