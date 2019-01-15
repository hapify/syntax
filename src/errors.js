'use strict';

module.exports = {
	/** @type ArgumentsError */
	ArgumentsError: class extends Error {},
	/** @type ParsingError */
	ParsingError: class extends Error {},
	/** @type EvaluationError */
	EvaluationError: class extends Error {},
	/** @type InternalError */
	InternalError: class extends Error {}
};
