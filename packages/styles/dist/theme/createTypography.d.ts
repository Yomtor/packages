import { YomtorSizes } from '../constants';
export declare type TypographyOptions = {
    fontFamily: string;
    lineHeight: number;
    fontSizes: Record<YomtorSizes, number>;
};
export default function createTypography(): TypographyOptions;
