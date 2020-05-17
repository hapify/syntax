export declare class InternalError extends Error {
    code: number;
    name: string;
}
export declare class ArgumentsError extends Error {
    code: number;
    name: string;
}
export declare class ParsingError extends Error {
    code: number;
    name: string;
}
export declare class EvaluationError extends Error {
    code: number;
    name: string;
    lineNumber: number;
    columnNumber: number;
}
export declare class TimeoutError extends Error {
    name: string;
    code: number;
}
