'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HapifySyntax = void 0;
const hapify_vm_1 = require("hapify-vm");
const line_column_1 = __importDefault(require("line-column"));
const Hoek = __importStar(require("@hapi/hoek"));
const errors_1 = require("./errors");
const escape_back_slashes_1 = require("./patterns/escape-back-slashes");
const escape_quotes_1 = require("./patterns/escape-quotes");
const comment_1 = require("./patterns/comment");
const name_interpolation_1 = require("./patterns/name-interpolation");
const interpolation_1 = require("./patterns/interpolation");
const conditional_1 = require("./patterns/conditional");
const iteration_1 = require("./patterns/iteration");
const evaluate_1 = require("./patterns/evaluate");
const escape_1 = require("./patterns/escape");
/** Ordered patterns */
const PatternsStack = [
    escape_back_slashes_1.EscapeBackSlashesPattern,
    escape_quotes_1.EscapeQuotesPattern,
    comment_1.CommentPattern,
    name_interpolation_1.NameInterpolationPattern,
    interpolation_1.InterpolationPattern,
    conditional_1.ConditionalPattern,
    iteration_1.IterationPattern,
    evaluate_1.EvaluatePattern,
    escape_1.EscapePattern
];
const DefaultOptions = {
    timeout: 1000,
};
/** @type {HapifySyntax} Syntax parser */
class HapifySyntax {
    /** Constructor */
    constructor(template, model, options = {}) {
        this.template = template;
        this.model = model;
        this.actions = [];
        this.patterns = PatternsStack.map((Pattern) => new Pattern(this));
        this.original = template;
        this.options = Hoek.applyToDefaults(DefaultOptions, options);
    }
    /** Parser method */
    static run(template, model, options = {}) {
        // Check how many arguments
        if (arguments.length < 2) {
            throw new errors_1.ArgumentsError('[HapifySyntax.run] Requires at least two arguments');
        }
        // Check arguments
        if (typeof template !== 'string') {
            throw new errors_1.ArgumentsError('[HapifySyntax.run] template must be a string');
        }
        if (typeof model !== 'object') {
            throw new errors_1.ArgumentsError('[HapifySyntax.run] model must be an object');
        }
        if (model === null) {
            throw new errors_1.ArgumentsError('[HapifySyntax.run] model cannot be null');
        }
        const runner = new HapifySyntax(template, model, options);
        // Execute all patterns
        // @todo Should catch parsing error
        runner.parse();
        return runner.evaluate();
    }
    /** Execute all patterns to convert hpf to js */
    parse() {
        for (const pattern of this.patterns) {
            pattern.execute();
        }
    }
    /** Eval the generated script */
    evaluate() {
        // eslint-disable-line no-unused-vars
        // Cannot inject object with key root in context.
        const script = `const root = _root; let out = \n\`${this.template}\`\n; return out;`;
        try {
            return new hapify_vm_1.HapifyVM({ timeout: this.options.timeout }).run(script, { _root: this.model });
        }
        catch (error) {
            if (error.code === 6003) {
                throw new errors_1.TimeoutError(`Template processing timed out (${this.options.timeout}ms)`);
            }
            if (error.code === 6002) {
                throw this.getReversedActionError(error, -1);
            }
            throw error;
        }
    }
    /** Reverse all action to find the error line and column in the input file */
    getReversedActionError(error, lineOffset = 0) {
        // Get the line and column of the error
        const lineNumber = typeof error.lineNumber === 'number' ? error.lineNumber + lineOffset : 0;
        const columnNumber = typeof error.columnNumber === 'number' ? error.columnNumber : 0;
        let errorIndex = line_column_1.default(this.template).toIndex(lineNumber, columnNumber);
        // Reverse all actions to find the line and column of the error in the input
        this.actions.reverse().forEach((action) => {
            if (errorIndex >= action.index) {
                // The error is impacted only if the error is in or after the action
                if (errorIndex <= action.index + action.after && action.after !== 0) {
                    // If the error is in the action and the action is not a comment, the error is link to that action
                    errorIndex = action.index;
                }
                else {
                    // Else, move the errorIndex
                    errorIndex += action.before - action.after;
                }
            }
        });
        const errorLineColumn = line_column_1.default(this.original).fromIndex(errorIndex);
        // Create the input error
        const evalError = new errors_1.EvaluationError(error.message);
        evalError.lineNumber = errorLineColumn ? errorLineColumn.line : null;
        evalError.columnNumber = errorLineColumn ? errorLineColumn.col : null;
        evalError.details = `Error: ${evalError.message}. Line: ${evalError.lineNumber}, Column: ${evalError.columnNumber}`;
        return evalError;
    }
}
exports.HapifySyntax = HapifySyntax;
//# sourceMappingURL=index.js.map