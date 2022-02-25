export declare type YomtorOptions = {
    label: string;
    value: any;
}[];
export declare const toKeyValue: (options: {
    [key: string]: string;
} | (string | number)[]) => YomtorOptions;
