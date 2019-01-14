'use strict';

const BasePattern = require('./base');

/** @type {RegExp} Interpolation pattern */
const RegEx = /<<=([\s\S]+?)>>/g;

/** @type {InterpolationPattern} Interpolation pattern */
module.exports = class InterpolationPattern extends BasePattern {
	/**
	 * Parser method
	 * @param {string} template
	 * @param {array} actions
	 * @return {string}
	 */
	static execute(template, actions = []) {
		return template.replaceSyntaxPattern(actions, RegEx, (match, _code) =>
			InterpolationPattern._dynamic(`out += ${InterpolationPattern._unescape(_code)};`)
		);
	}
};
