export declare const Conditional: {
    new (parent: any): import("./conditional");
    execute(template: string): string;
};
export declare const Escape: {
    new (parent: any): import("./escape");
    execute(template: string): string;
};
export declare const EscapeQuotes: {
    new (parent: any): import("./escape-quotes");
    execute(template: string): string;
};
export declare const EscapeBackSlashes: {
    new (parent: any): import("./escape-back-slashes");
    execute(template: string): string;
};
export declare const NameInterpolation: {
    new (parent: any): import("./name-interpolation");
    execute(template: string): string;
};
export declare const Interpolation: {
    new (parent: any): import("./interpolation");
    execute(template: string): string;
};
export declare const Evaluate: {
    new (parent: any): import("./evaluate");
    execute(template: string): string;
};
export declare const Iteration: {
    new (parent: any): import("./iteration");
    execute(template: string): string;
};
export declare const Comment: {
    new (parent: any): import("./comment");
    execute(template: string): string;
};
