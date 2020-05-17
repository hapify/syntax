export = NameInterpolationPattern;
declare const NameInterpolationPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class NameInterpolationPattern extends NameInterpolationPattern_base {
    constructor(parent: any);
}
