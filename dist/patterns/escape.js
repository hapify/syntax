"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapePattern = void 0;
const base_1 = require("./base");
/** Start pattern and replacer */
const Start = {
    find: /\\<\\</g,
    replace: '<<',
};
/** end pattern and replacer */
const End = {
    find: /\\>\\>/g,
    replace: '>>',
};
/** Escape pattern */
class EscapePattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(Start.find, Start.replace).replace(End.find, End.replace);
    }
}
exports.EscapePattern = EscapePattern;
//# sourceMappingURL=escape.js.map