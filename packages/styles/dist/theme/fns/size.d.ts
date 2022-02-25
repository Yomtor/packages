import { YomtorSizes } from '../../constants';
export declare type Size = (args: {
    size: YomtorSizes | number;
    sizes: Record<YomtorSizes, any>;
}) => number;
export declare const size: (args: {
    size: YomtorSizes | number;
    sizes: Record<YomtorSizes, any>;
}) => any;
