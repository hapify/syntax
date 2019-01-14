'use strict';

const { ConstructorError, ArgumentsError, EvaluationError } = require('./errors');
const Patterns = require('./patterns');
const SafeEval = require('safe-eval');
const lineColumn = require('line-column');
const ErrorStackParser = require('error-stack-parser');

/** @type {BasePattern[]} Ordered patterns */
const PatternsStack = [
	Patterns.Comment,
	Patterns.NameInterpolation,
	Patterns.Interpolation,
	Patterns.Conditional,
	Patterns.Iteration,
	Patterns.Evaluate,
	Patterns.Escape
];
/**
 * Perform a regex replacement and saves the actions made on the string
 * @param actions
 * @param regexp
 * @param replace
 * @return {string}
 */
String.prototype.replaceSyntaxPattern = function(actions, regexp, replace) {
	return require('./replace')(this, actions, regexp, replace);
};

/** @type {HapifySyntax} Syntax parser */
module.exports = class HapifySyntax {
	/** Constructor */
	constructor() {
		throw new ConstructorError('[HapifySyntax] Cannot be instanced');
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

		const actions = [];

		// Escape quotes
		let output = HapifySyntax._escape(template, actions);

		// Execute all patterns
		for (const pattern of PatternsStack) {
			output = pattern.execute(output, actions);
		}

		try {
			return HapifySyntax._eval(output, model);
		} catch (error) {
			throw HapifySyntax._getReversedActionError(template, output, error, actions);
		}
	}

	/**
	 * Escape quotes
	 * @param {string} template
	 * @param {array} actions
	 * @private
	 */
	static _escape(template, actions) {
		return template.replaceSyntaxPattern(actions, /`/g, '\\`').replaceSyntaxPattern(actions, /\$/g, '\\$');
	}

	/**
	 * Eval the generated script
	 * @param {string} template
	 * @param {{}|{}[]} root
	 * @private
	 */
	static _eval(template, root) {
		// eslint-disable-line no-unused-vars
		const final = `(function() {let out = \`${template}\`; return out;})()`;
		try {
			return SafeEval(final, { root }, { lineOffset: -10 });
		} catch (error) {
			HapifySyntax._log(`[HapifySyntax._eval] An error occurred during evaluation\n\n${error}\n\n${final}`);

			throw error;
		}
	}

	/**
	 * Reverse all action to find the error line and column in the input file
	 * @param {*} input
	 * @param {*} output
	 * @param {*} error
	 * @param {*} actions
	 */
	static _getReversedActionError(input, output, error, actions) {
		// Get the line and column of the error
		const { lineNumber, columnNumber } = ErrorStackParser.parse(error)[0];
		let errorIndex = lineColumn(output).toIndex(lineNumber, columnNumber);

		// Reverse all acitons to find the line and column of the error in the input
		actions.reverse().forEach(action => {
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

		const errorLineColumn = lineColumn(input).fromIndex(errorIndex);

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
	static _log(/* arguments */) {
		// console.log(...arguments); // eslint-disable-line no-console
	}
};
