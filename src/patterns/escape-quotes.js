'use strict';

const BasePattern = require('./base');

/** @type {EscapeQuotesPattern} Escape quotes pattern */
module.exports = class EscapeQuotesPattern extends BasePattern {
	/** Parser method */
	execute() {
		this._replace(/`/g, '\\`')._replace(/\$/g, '\\$');
	}
};
