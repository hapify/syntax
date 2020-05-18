'use strict';

import { ConditionalPattern } from './conditional';

/** for() { pattern */
const ForPattern = /<<@(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*([a-zA-Z_]+)\s*>>/g;
/** pattern */
const EndPattern = /<<@>>/g;

/** Conditional pattern */
export class IterationPattern extends ConditionalPattern {
	/** Parser method */
	execute(): void {
		this.replace(ForPattern, (match, count, variable, condition, assignment) => {
			const jsFilter = this.filter(count, this.variable(variable), this.tester(condition));
			return this.dynamic(`for (const ${assignment} of ${jsFilter}) {`);
		}).replace(EndPattern, () => this.dynamic('}'));
	}

	/** Returns the array filter */
	private filter(count: string, variable: string, tester: string): string {
		const slicer = typeof count === 'undefined' ? '' : `.slice(0, ${count})`;

		return `${variable}.filter${tester}${slicer}`;
	}
}