'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpolationPattern = void 0;
const base_1 = require("./base");
/** Interpolation pattern */
const RegEx = /<<=([\s\S]+?)>>/g;
/** Interpolation pattern */
class InterpolationPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(RegEx, (match, code) => this.dynamic(`out += ${this.unescape(code)};`));
    }
}
exports.InterpolationPattern = InterpolationPattern;
//# sourceMappingURL=interpolation.js.map