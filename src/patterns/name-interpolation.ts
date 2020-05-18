'use strict';

import { BasePattern } from './base';
import { ParsingError } from '../errors';

/** Name interpolation pattern */
const RegEx = /<<([a-zA-Z_.]+)\s+([aA_\-R]+)\s*>>/g;

/** NameInterpolation pattern */
export class NameInterpolationPattern extends BasePattern {
	/** Parser method */
	execute(): void {
		this.replace(RegEx, (match, variable, property) => {
			// Get the var
			let jsVariable = variable;
			if (jsVariable === 'M') jsVariable = 'root';
			else if (jsVariable === 'P') jsVariable = 'root.fields.primary';

			// Get the property
			let jsProperty = property;
			if (jsProperty === 'aA') jsProperty = 'camel';
			else if (jsProperty === 'AA') jsProperty = 'pascal';
			else if (jsProperty === 'a') jsProperty = 'lower';
			else if (jsProperty === 'A') jsProperty = 'capital';
			else if (jsProperty === 'a-a') jsProperty = 'kebab';
			else if (jsProperty === 'A-A') jsProperty = 'header';
			else if (jsProperty === 'a_a') jsProperty = 'snake';
			else if (jsProperty === 'A_A') jsProperty = 'constant';
			else if (jsProperty === 'aa') jsProperty = 'compact';
			else if (jsProperty === 'R') jsProperty = 'raw';
			else throw new ParsingError(`[NameInterpolationPattern.execute] Unknown name property: ${jsProperty}`);

			return `\${${jsVariable}.names.${jsProperty}}`;
		});
	}
}
