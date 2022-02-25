import { YomtorTheme } from './types';
export declare const getCssVars: (theme: Partial<YomtorTheme>) => {
    [key: string]: string;
};
export declare const createTheme: (options?: Partial<YomtorTheme>) => YomtorTheme;
