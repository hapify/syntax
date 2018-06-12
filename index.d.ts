// Type definitions for library

interface IHapifySyntax {
  run(template: string, model: any): string;
}

declare var HapifySyntax: IHapifySyntax;

declare module "hapify-syntax" {
  export = HapifySyntax;
}
