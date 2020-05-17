export = EvaluatePattern;
declare const EvaluatePattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class EvaluatePattern extends EvaluatePattern_base {
    constructor(parent: any);
}
