"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.EvaluationError = exports.ParsingError = exports.ArgumentsError = exports.InternalError = void 0;
class InternalError extends Error {
    constructor() {
        super(...arguments);
        this.code = 1001;
        this.name = 'SyntaxInternalError';
    }
}
exports.InternalError = InternalError;
class ArgumentsError extends Error {
    constructor() {
        super(...arguments);
        this.code = 1002;
        this.name = 'SyntaxArgumentsError';
    }
}
exports.ArgumentsError = ArgumentsError;
class ParsingError extends Error {
    constructor() {
        super(...arguments);
        this.code = 1003;
        this.name = 'SyntaxParsingError';
    }
}
exports.ParsingError = ParsingError;
class EvaluationError extends Error {
    constructor() {
        super(...arguments);
        this.code = 1004;
        this.name = 'SyntaxEvaluationError';
        this.lineNumber = null;
        this.columnNumber = null;
        this.details = null;
    }
}
exports.EvaluationError = EvaluationError;
class TimeoutError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'SyntaxTimeoutError';
        this.code = 1005;
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=errors.js.map