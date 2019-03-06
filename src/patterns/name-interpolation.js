'use strict';

const BasePattern = require('./base');
const { ParsingError } = require('../errors');

/** @type {RegExp} Name interpolation pattern */
const RegEx = /<<([a-zA-Z_.]+)\s+([aA_\-R]+)\s*>>/g;

/** @type {NameInterpolationPattern} NameInterpolation pattern */
module.exports = class NameInterpolationPattern extends BasePattern {
	/** Parser method */
	execute() {
		this._replace(RegEx, (match, _variable, _property) => {
			// Get the var
			let variable = _variable;
			if (variable === 'M') variable = 'root';
			else if (variable === 'P') variable = 'root.fields.primary';

			// Get the property
			let property = _property;
			if (property === 'aA') property = 'camel';
			else if (property === 'AA') property = 'pascal';
			else if (property === 'a') property = 'lower';
			else if (property === 'A') property = 'capital';
			else if (property === 'a-a') property = 'kebab';
			else if (property === 'A-A') property = 'header';
			else if (property === 'a_a') property = 'snake';
			else if (property === 'A_A') property = 'constant';
			else if (property === 'aa') property = 'compact';
			else if (property === 'R') property = 'raw';
			else throw new ParsingError(`[NameInterpolationPattern.execute] Unknown name property: ${property}`);

			return `\${${variable}.names.${property}}`;
		});
	}
};
