'use strict';

const BasePattern = require('./base');

/** @type {EscapeBackSlashesPattern} Escape back-slashes pattern */
module.exports = class EscapeBackSlashesPattern extends BasePattern {
	/** Parser method */
	execute() {
		this._replace(/\\([^<>]|<<|$)/g, '\\\\$1');
	}
};
