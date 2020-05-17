export = ConditionalPattern;
declare const ConditionalPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class ConditionalPattern extends ConditionalPattern_base {
    constructor(parent: any);
    /**
     * Returns the full condition to be injected in the 'if' statement
     * @param {string} _count
     * @param {string} variable
     * @param {string} tester
     * @return {string}
     */
    _condition(_count: string, variable: string, tester: string): string;
    /**
     * Convert the condition short code to tester method
     * @param {string} _condition
     * @return {string}
     */
    _tester(_condition: string): string;
    /**
     * Convert the input variable to the real variable
     * @param {string} _variable
     * @return {string}
     */
    _variable(_variable: string): string;
}
