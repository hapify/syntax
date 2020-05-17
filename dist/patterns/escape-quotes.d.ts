export = EscapeQuotesPattern;
declare const EscapeQuotesPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class EscapeQuotesPattern extends EscapeQuotesPattern_base {
    constructor(parent: any);
}
