export = IterationPattern;
declare const IterationPattern_base: {
    new (parent: any): import("./conditional");
    execute(template: string): string;
};
declare class IterationPattern extends IterationPattern_base {
    constructor(parent: any);
    /**
     * Returns the array filter
     * @param {string} _count
     * @param {string} variable
     * @param {string} tester
     * @return {string}
     */
    _filter(_count: string, variable: string, tester: string): string;
}
