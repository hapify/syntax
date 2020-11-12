export type ConverterReplacement = { search: string | RegExp; replace: string };

export abstract class SyntaxConverter {
	protected extractor = /<<([a-zA-Z@/?].*)>>/gm;
	protected abstract replacers: ConverterReplacement[];

	constructor(private template: string) {}

	execute(): string {
		// Extract parts to convert (conditions, iterations and name interpolations)
		return this.template.replace(this.extractor, (part: string, inner: string) => {
			let output = inner;
			for (const replacer of this.replacers) {
				output = output.replace(replacer.search, replacer.replace);
			}
			return `<<${output}>>`;
		});
	}
}
