"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeQuotesPattern = void 0;
const base_1 = require("./base");
/** Escape quotes pattern */
class EscapeQuotesPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(/\$/g, '\\$').replace(/`/g, '\\`');
    }
}
exports.EscapeQuotesPattern = EscapeQuotesPattern;
//# sourceMappingURL=escape-quotes.js.map