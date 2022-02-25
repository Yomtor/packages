import { YomtorSizes } from '../constants';
export declare type BreakpointDefaults = Record<YomtorSizes, boolean>;
export declare type Breakpoint = keyof BreakpointDefaults;
export declare type Methods = 'up' | 'down';
export declare type BreakpointValues = {
    [key in Breakpoint]: number;
};
export interface Breakpoints {
    keys: Breakpoint[];
    values: BreakpointValues;
    up: (key: Breakpoint | number) => string;
    down: (key: Breakpoint | number) => string;
    between: (start: Breakpoint | number, end: Breakpoint | number) => string;
    only: (key: Breakpoint) => string;
    width: (key: Breakpoint) => number;
    media: {
        [key in Methods]: {
            [key in Breakpoint]: string;
        };
    };
}
export declare type BreakpointsOptions = Partial<{
    unit: string;
    step: number;
}> & Breakpoints;
export declare const breakpointKeys: string[];
export default function createBreakpoints(breakpoints: BreakpointsOptions): any;
