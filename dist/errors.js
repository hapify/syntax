'use strict';
module.exports = {
    /** @type InternalError */
    InternalError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'SyntaxInternalError';
            this.code = 1001;
        }
    },
    /** @type ArgumentsError */
    ArgumentsError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'SyntaxArgumentsError';
            this.code = 1002;
        }
    },
    /** @type ParsingError */
    ParsingError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'SyntaxParsingError';
            this.code = 1003;
        }
    },
    /** @type EvaluationError */
    EvaluationError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'SyntaxEvaluationError';
            this.code = 1004;
            this.lineNumber = null;
            this.columnNumber = null;
        }
    },
    /** @type TimeoutError */
    TimeoutError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'SyntaxTimeoutError';
            this.code = 1005;
        }
    }
};
//# sourceMappingURL=errors.js.map