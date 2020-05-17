export = BasePattern;
declare class BasePattern {
    /**
     * Static parser method used for testing purpose
     * @param {string} template
     * @return {string}
     */
    static execute(template: string): string;
    /** Constructor */
    constructor(parent: any);
    /** @type {HapifySyntax} */
    parent: any;
    /** Parser method */
    execute(): void;
    /**
     * Escape string and insert js code
     * @param {string} js
     * @return {string}
     * @private
     */
    private _dynamic;
    /**
     * Reverse escape signs ` $ \ escaped by EscapeQuotesPattern & EscapeBackSlashesPattern
     * @param {string} code
     * @return {string}
     */
    _unescape(code: string): string;
    /**
     * Perform a regex replacement and saves the actions made on the string
     * @param regexp
     * @param replace
     * @return {BasePattern}
     * @private
     */
    private _replace;
}
