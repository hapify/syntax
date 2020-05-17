export = HapifySyntax;
declare class HapifySyntax {
    /**
     * Parser method
     * @param {string} template
     * @param {{}} model
     * @param {Options} options
     * @return {string}
     */
    static run(template: string, model: {}, options?: Options, ...args: any[]): string;
    /** Constructor */
    constructor(template: any, model: any, options?: {});
    /** @type {string} Stores the original input */
    original: string;
    /** @type {string} */
    template: string;
    /** @type {{}|{}[]} */
    model: {} | {}[];
    /** @type {Options} */
    options: Options;
    /** @type {{}[]} */
    actions: {}[];
    /** @type {BasePattern[]} */
    patterns: any[];
    /** Execute all patterns to convert hpf to js */
    parse(): void;
    /** Eval the generated script */
    evaluate(): any;
    /**
     * Reverse all action to find the error line and column in the input file
     * @param {*} error
     * @param {number} lineOffset
     */
    getReversedActionError(error: any, lineOffset?: number): any;
    /**
     * Log something
     * @private
     */
    private _log;
}
declare namespace HapifySyntax {
    export { Options };
}
/**
 * Options format
 */
type Options = {
    timeout: number;
};
