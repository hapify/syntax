'use strict';

const { ArgumentsError, EvaluationError, TimeoutError } = require('./errors');
const Patterns = require('./patterns');
const { SaferEval } = require('safer-eval');
const lineColumn = require('line-column');
const ErrorStackParser = require('error-stack-parser');
const TIMEOUT = 1000;

/** @type {BasePattern[]} Ordered patterns */
const PatternsStack = [
	Patterns.EscapeQuotes,
	Patterns.Comment,
	Patterns.NameInterpolation,
	Patterns.Interpolation,
	Patterns.Conditional,
	Patterns.Iteration,
	Patterns.Evaluate,
	Patterns.Escape
];

/** @type {HapifySyntax} Syntax parser */
module.exports = class HapifySyntax {
	/** Constructor */
	constructor(template, model) {
		/** @type {string} Stores the original input */
		this.original = template;
		/** @type {string} */
		this.template = template;
		/** @type {{}|{}[]} */
		this.model = model;
		/** @type {{}[]} */
		this.actions = [];
		/** @type {BasePattern[]} */
		this.patterns = PatternsStack.map(Pattern => new Pattern(this));
	}

	/**
	 * Parser method
	 * @param {string} template
	 * @param {{}} model
	 * @return {string}
	 */
	static run(template, model) {
		// Check how many arguments
		if (arguments.length !== 2) {
			throw new ArgumentsError('[HapifySyntax.run] Requires two arguments');
		}

		// Check arguments
		if (typeof template !== 'string') {
			throw new ArgumentsError('[HapifySyntax.run] template must be a string');
		}
		if (typeof model !== 'object') {
			throw new ArgumentsError('[HapifySyntax.run] model must be an object');
		}
		if (model === null) {
			throw new ArgumentsError('[HapifySyntax.run] model cannot be null');
		}

		const runner = new HapifySyntax(template, model);

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
        const final = `(function() {let out = \n\`${this.template}\`\n; return out;})()`;
		try {
			return new SaferEval({ root: this.model }, {
                filename: 'hpf-generator.js',
                timeout: TIMEOUT,
				lineOffset: -1,
                contextCodeGeneration: {
                    strings: false,
                    wasm: false,
				}
			}).runInContext(final);
		} catch (error) {
			this._log(`[HapifySyntax._eval] An error occurred during evaluation\n\n${error}\n\n${final}`);
            if  (error.message === 'Script execution timed out.') {
				throw new TimeoutError(`Template processing timed out (${TIMEOUT}ms)`);
            }
			throw this.getReversedActionError(error);
		}
	}

	/**
	 * Reverse all action to find the error line and column in the input file
	 * @param {*} error
	 */
	getReversedActionError(error) {
		// Get the line and column of the error
		const { lineNumber, columnNumber } = ErrorStackParser.parse(error)[0];
		let errorIndex = lineColumn(this.template).toIndex(lineNumber, columnNumber);

		// Reverse all acitons to find the line and column of the error in the input
		this.actions.reverse().forEach(action => {
			if (errorIndex >= action.index) {
				// The error is impacted only if the error is in or after the action
				if (errorIndex <= action.index + action.after && action.after !== 0) {
					// If the error is in the action and the action is not a comment, the error is link to that action
					errorIndex = action.index;
				} else {
					// Else, move the errorIndex
					errorIndex += action.before - action.after;
				}
			}
		});

		const errorLineColumn = lineColumn(this.original).fromIndex(errorIndex);

		// Create the input error
		const evalError = new EvaluationError(error.message);
		evalError.lineNumber = errorLineColumn ? errorLineColumn.line : null;
		evalError.columnNumber = errorLineColumn ? errorLineColumn.col : null;
		evalError.stack = `Error: ${evalError.message}. Line: ${evalError.lineNumber}, Column: ${evalError.columnNumber}`;

		return evalError;
	}

	/**
	 * Log something
	 * @private
	 */
	_log(/* arguments */) {
		// console.log(...arguments); // eslint-disable-line no-console
	}
};
