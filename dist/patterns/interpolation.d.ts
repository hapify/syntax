export = InterpolationPattern;
declare const InterpolationPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class InterpolationPattern extends InterpolationPattern_base {
    constructor(parent: any);
}
