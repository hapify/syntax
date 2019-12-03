'use strict';

const { ArgumentsError, EvaluationError, TimeoutError } = require('./errors');
const Patterns = require('./patterns');
const { HapifyVM } = require('hapify-vm');
const lineColumn = require('line-column');
const Hoek = require('hoek');

/** @type {BasePattern[]} Ordered patterns */
const PatternsStack = [
	Patterns.EscapeBackSlashes,
	Patterns.EscapeQuotes,
	Patterns.Comment,
	Patterns.NameInterpolation,
	Patterns.Interpolation,
	Patterns.Conditional,
	Patterns.Iteration,
	Patterns.Evaluate,
	Patterns.Escape
];

/**
 * Options format
 * @typedef {object} Options
 * @property {number} timeout
 */
/** @type {Options} */
const DefaultOptions = {
	timeout: 1000
};

/** @type {HapifySyntax} Syntax parser */
module.exports = class HapifySyntax {
	/** Constructor */
	constructor(template, model, options = {}) {
		/** @type {string} Stores the original input */
		this.original = template;
		/** @type {string} */
		this.template = template;
		/** @type {{}|{}[]} */
		this.model = model;
		/** @type {Options} */
		this.options = Hoek.applyToDefaults(DefaultOptions, options);
		/** @type {{}[]} */
		this.actions = [];
		/** @type {BasePattern[]} */
		this.patterns = PatternsStack.map(Pattern => new Pattern(this));
	}

	/**
	 * Parser method
	 * @param {string} template
	 * @param {{}} model
	 * @param {Options} options
	 * @return {string}
	 */
	static run(template, model, options = {}) {
		// Check how many arguments
		if (arguments.length < 2) {
			throw new ArgumentsError('[HapifySyntax.run] Requires at least two arguments');
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
			return new HapifyVM({ timeout: this.options.timeout }).run(script, { _root: this.model });
		} catch (error) {
			this._log(`[HapifySyntax._eval] An error occurred during evaluation\n\n${error}\n\n${script}`);
			if (error.code === 6003) {
				throw new TimeoutError(`Template processing timed out (${this.options.timeout}ms)`);
			}
			if (error.code === 6002) {
				throw this.getReversedActionError(error, -1);
			}
			throw error;
		}
	}

	/**
	 * Reverse all action to find the error line and column in the input file
	 * @param {*} error
	 * @param {number} lineOffset
	 */
	getReversedActionError(error, lineOffset = 0) {
		// Get the line and column of the error
		const lineNumber = typeof error.lineNumber === 'number' ? error.lineNumber + lineOffset: 0;
		const columnNumber = typeof error.columnNumber === 'number' ? error.columnNumber : 0;
		let errorIndex = lineColumn(this.template).toIndex(lineNumber, columnNumber);

		// Reverse all actions to find the line and column of the error in the input
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
		evalError.details = `Error: ${evalError.message}. Line: ${evalError.lineNumber}, Column: ${evalError.columnNumber}`;

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
