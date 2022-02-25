import * as CSSType from 'csstype';
export declare type ClassNames<T extends (...args: any) => {
    classes: Record<string, any>;
    cx: (...cx: any) => string;
}> = keyof ReturnType<T>['classes'];
export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject, CSSTssSpecials {
}
export declare type CSSTssSpecials = {
    ref?: string;
};
export declare type CSSProperties = CSSType.PropertiesFallback<number | string>;
export declare type CSSPropertiesWithMultiValues = {
    [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>> | boolean;
};
export declare type CSSPseudos = {
    [K in CSSType.Pseudos]?: CSSObject;
};
export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {
}
export interface ComponentSelector {
    __emotion_styles: any;
}
export declare type Keyframes = {
    name: string;
    styles: string;
    anim: number;
    toString: () => string;
} & string;
export interface SerializedStyles {
    name: string;
    styles: string;
    map?: string;
    next?: SerializedStyles;
}
export declare type InterpolationPrimitive = null | undefined | boolean | number | string | ComponentSelector | Keyframes | SerializedStyles | CSSObject;
export declare type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;
export interface CSSOthersObject {
    [propertiesName: string]: CSSInterpolation;
}
export interface CSS {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
}
