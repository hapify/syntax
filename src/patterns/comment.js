'use strict';

const BasePattern = require('./base');

/** @type {RegExp} Comment pattern */
const RegEx = /<<#([\s\S]+?)>>/g;

/** @type {CommentPattern} Comment pattern */
module.exports = class CommentPattern extends BasePattern {
	/**
	 * Parser method
	 * @param {string} template
	 * @return {string}
	 */
	static execute(template, actions = []) {
		return template.replaceSyntaxPattern(actions, RegEx, '');
	}
};
