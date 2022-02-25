export declare type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export declare type HeadingOptions = {
    fontFamily: string;
    fontWeight: number;
    sizes: {
        [key in Headings]: {
            fontSize: number;
            lineHeight: number;
        };
    };
};
export default function createHeadings(): HeadingOptions;
