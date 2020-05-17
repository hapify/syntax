export = EscapePattern;
declare const EscapePattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class EscapePattern extends EscapePattern_base {
    constructor(parent: any);
}
