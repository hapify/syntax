import { Action, ModelInput, Options } from "./interfaces";
/** @type {HapifySyntax} Syntax parser */
export declare class HapifySyntax {
    template: string;
    private model;
    private options;
    /** Stores the original input */
    private original;
    actions: Action[];
    private patterns;
    /** Constructor */
    constructor(template: string, model: ModelInput, options?: Partial<Options>);
    /** Parser method */
    static run(template: string, model: ModelInput, options?: Partial<Options>): string;
    /** Execute all patterns to convert hpf to js */
    private parse;
    /** Eval the generated script */
    private evaluate;
    /** Reverse all action to find the error line and column in the input file */
    private getReversedActionError;
}
