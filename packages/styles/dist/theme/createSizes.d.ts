import { YomtorSizes } from '../constants';
export declare type SizesOptions = {
    default: Record<YomtorSizes, number>;
    icons: Record<YomtorSizes, number>;
};
export default function createSizes(): SizesOptions;
