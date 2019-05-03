'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

const ConditionalPattern = require('./conditional');

/** @type {RegExp} for() { pattern */
const ForPattern = /<<@(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*([a-zA-Z_]+)\s*>>/g;
/** @type {RegExp} } pattern */
const EndPattern = /<<@>>/g;

/** @type {IterationPattern} Conditional pattern */
module.exports = class IterationPattern extends ConditionalPattern {
	/** Parser method */
	execute() {
		this._replace(ForPattern, (match, _count, _variable, _condition, _assignment) => {
			// Get the full syntax
			const variable = this._variable(_variable);
			const tester = this._tester(_condition);
			const filter = this._filter(_count, variable, tester);

			return this._dynamic(`for (const ${_assignment} of ${filter}) {`);
		})._replace(EndPattern, () => this._dynamic('}'));
	}

	/**
	 * Returns the array filter
	 * @param {string} _count
	 * @param {string} variable
	 * @param {string} tester
	 * @return {string}
	 */
	_filter(_count, variable, tester) {
		const slicer = typeof _count === 'undefined' ? '' : `.slice(0, ${_count})`;

		return `${variable}.filter${tester}${slicer}`;
	}
};
