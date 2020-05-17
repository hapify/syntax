export class InternalError extends Error {
    constructor(message: any);
    code: number;
}
export class ArgumentsError extends Error {
    constructor(message: any);
    code: number;
}
export class ParsingError extends Error {
    constructor(message: any);
    code: number;
}
export class EvaluationError extends Error {
    constructor(message: any);
    code: number;
    lineNumber: any;
    columnNumber: any;
}
export class TimeoutError extends Error {
    constructor(message: any);
    code: number;
}
