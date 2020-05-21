"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluatePattern = void 0;
const base_1 = require("./base");
/** Evaluation pattern */
const RegEx = /<<<([\s\S]+?)>>>/g;
/** Evaluate pattern */
class EvaluatePattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(RegEx, (match, code) => this.dynamic(this.unescape(code)));
    }
}
exports.EvaluatePattern = EvaluatePattern;
//# sourceMappingURL=evaluate.js.map