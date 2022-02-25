export declare const YOMTOR_SIZES: readonly ["xs", "sm", "md", "lg", "xl"];
export declare type YomtorSizes = typeof YOMTOR_SIZES[number] | number;
export declare const YOMTOR_COLORS: readonly ["primary", "secondary", "warning", "info", "error"];
export declare type YomtorColors = typeof YOMTOR_COLORS[number];
export declare const Yomtor_LEVELS: readonly ["lightest", "light", "main", "dark", "darkest"];
export declare type YomtorLevels = typeof Yomtor_LEVELS[number];
export declare const YOMTOR_VARIANTS: readonly ["filled", "transparent", "hover", "light", "outline", "default", "white", "gradient", "subtle"];
export declare type YomtorVariants = typeof YOMTOR_VARIANTS[number];
export declare type YomtorGradient = {
    from: string;
    to: string;
    deg: number;
};
