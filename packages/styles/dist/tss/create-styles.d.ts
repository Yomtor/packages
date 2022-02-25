import type { CSSObject } from './types';
import { YomtorTheme } from '../theme/types';
export interface UseStylesOptions<Key extends string> {
    classNames?: Partial<Record<Key, string>>;
    styles?: Partial<Record<Key, CSSObject>> | ((theme: YomtorTheme) => Partial<Record<Key, CSSObject>>);
    name: string;
}
export declare function createStyles<Key extends string = string, Params = void>(getCssObjectOrCssObject: ((theme: YomtorTheme, params: Params, createRef: (refName: string) => string) => Record<Key, CSSObject>) | Record<Key, CSSObject>): (params?: Params, options?: UseStylesOptions<Key>) => {
    classes: Record<Key, string>;
    cx: (...args: any) => string;
    theme: YomtorTheme;
};
