export = EscapeBackSlashesPattern;
declare const EscapeBackSlashesPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class EscapeBackSlashesPattern extends EscapeBackSlashesPattern_base {
    constructor(parent: any);
}
