'use strict';

const lineColumn = require('line-column');

/** @type {BasePattern} Abstract base pattern */
module.exports = class BasePattern {
	/** Constructor */
	constructor(parent) {
		/** @type {HapifySyntax} */
		this.parent = parent;
	}

	/** Parser method */
	execute() {
		/* Do Nothing */
	}

	/**
	 * Escape string and insert js code
	 * @param {string} js
	 * @return {string}
	 * @private
	 */
	_dynamic(js) {
		return `\`;
${js}
out += \``;
	}

	/**
	 * Reverse escape signs ` $ \ escaped by EscapeQuotesPattern & EscapeBackSlashesPattern
	 * @param {string} code
	 * @return {string}
	 */
	_unescape(code) {
		return code
			.replace(/\\\\/g, '\\')
			.replace(/\\`/g, '`')
			.replace(/\\\$/g, '$');
	}

	/**
	 * Perform a regex replacement and saves the actions made on the string
	 * @param regexp
	 * @param replace
	 * @return {BasePattern}
	 * @private
	 */
	_replace(regexp, replace) {
		let patternOffset = 0;

		this.parent.template = this.parent.template.replace(regexp, (...params) => {
			const match = params[0];
			const offset = params[params.length - 2];

			const replaceString = typeof replace === 'function' ? replace.apply(null, params) : match.replace(regexp, replace);

			// Save the impact of this replace
			this.parent.actions.push({
				index: patternOffset + offset,
				lineColumn: lineColumn(this.parent.template).fromIndex(patternOffset + offset),
				before: match.length,
				after: replaceString.length
			});

			patternOffset += replaceString.length - match.length;

			return replaceString;
		});

		return this;
	}

	/**
	 * Static parser method used for testing purpose
	 * @param {string} template
	 * @return {string}
	 */
	static execute(template) {
		// Create a fake parent
		const parent = { template, actions: [] };
		// Init an instance
		const pattern = new this(parent);
		// Execute the pattern and return the modified template
		pattern.execute();

		return parent.template;
	}
};
