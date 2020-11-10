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
			if (['M', 'Model'].includes(jsVariable)) jsVariable = 'root';
			else if (['P', 'PrimaryField'].includes(jsVariable)) jsVariable = 'root.fields.primary';

			// Get the property
			let jsProperty = property;
			if (['aA', 'camel'].includes(jsProperty)) jsProperty = 'camel';
			else if (['AA', 'pascal'].includes(jsProperty)) jsProperty = 'pascal';
			else if (['a', 'lower'].includes(jsProperty)) jsProperty = 'lower';
			else if (['A', 'capital'].includes(jsProperty)) jsProperty = 'capital';
			else if (['a-a', 'kebab'].includes(jsProperty)) jsProperty = 'kebab';
			else if (['A-A', 'header'].includes(jsProperty)) jsProperty = 'header';
			else if (['a_a', 'snake'].includes(jsProperty)) jsProperty = 'snake';
			else if (['A_A', 'constant'].includes(jsProperty)) jsProperty = 'constant';
			else if (['aa', 'compact'].includes(jsProperty)) jsProperty = 'compact';
			else if (['R', 'raw'].includes(jsProperty)) jsProperty = 'raw';
			else throw new ParsingError(`[NameInterpolationPattern.execute] Unknown name property: ${jsProperty}`);

			return `\${${jsVariable}.names.${jsProperty}}`;
		});
	}
}
