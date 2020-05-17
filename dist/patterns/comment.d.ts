export = CommentPattern;
declare const CommentPattern_base: {
    new (parent: any): import("./base");
    execute(template: string): string;
};
declare class CommentPattern extends CommentPattern_base {
    constructor(parent: any);
}
