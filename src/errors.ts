export class InternalError extends Error {
	code = 1001;
	name = 'SyntaxInternalError';
}
export class ArgumentsError extends Error {
	code = 1002;
	name = 'SyntaxArgumentsError';
}
export class ParsingError extends Error {
	code = 1003;
	name = 'SyntaxParsingError';
}
export class EvaluationError extends Error {
	code = 1004;
	name = 'SyntaxEvaluationError';
	lineNumber: number = null;
	columnNumber: number = null;
}
export class TimeoutError extends Error {
	name = 'SyntaxTimeoutError';
	code = 1005;
}
