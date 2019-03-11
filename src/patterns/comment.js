'use strict';

const BasePattern = require('./base');

/** @type {RegExp} Comment pattern */
const RegEx = /<<#([\s\S]+?)>>/g;

/** @type {CommentPattern} Comment pattern */
module.exports = class CommentPattern extends BasePattern {
	/** Parser method */
	execute() {
		this._replace(RegEx, '');
	}
};
