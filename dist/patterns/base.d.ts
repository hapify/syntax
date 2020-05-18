import { HapifySyntax } from "../index";
import { ReplacementCallback } from "../interfaces";
/** Abstract base pattern */
export declare class BasePattern {
    private parent;
    constructor(parent: HapifySyntax);
    /** Parser method */
    execute(): void;
    /** Escape string and insert js code */
    protected dynamic(js: string): string;
    /** Reverse escape signs ` $ \ escaped by EscapeQuotesPattern & EscapeBackSlashesPattern */
    protected unescape(code: string): string;
    /** Perform a regex replacement and saves the actions made on the string */
    protected replace(regexp: RegExp | string, replace: string | ReplacementCallback): this;
    /** Static parser method used for testing purpose */
    static execute(template: string): string;
}
