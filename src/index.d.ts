// Type definitions for Hapify Syntax

export = HapifySyntax;

/**
 * Declare options structure
 */
interface Options {
    timeout?: number;
}

/**
 * Declare the class
 */
declare class HapifySyntax {
    /**
     * Run the code generation for this template's content and this explicit model
     *
     * @param {string} template
     * @param {any} model
     * @param {Options} options
     * @return {string}
     */
    static run(template: string, model: any, options: Options = {}): string;
}
