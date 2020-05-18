export interface NumberedError extends Error {
    code: number;
}
export interface Replacement {
    search: string;
    replace: string;
    escape?: boolean;
}
export declare type ReplacementCallback = (...params: string[]) => string;
export interface Options {
    timeout: number;
}
export declare type ModelInput = {
    [key: string]: any;
} | {
    [key: string]: any;
}[];
export interface Action {
    index: number;
    lineColumn: {
        line: number;
        col: number;
    } | null;
    before: number;
    after: number;
}
