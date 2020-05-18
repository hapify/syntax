'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterationPattern = void 0;
const conditional_1 = require("./conditional");
/** for() { pattern */
const ForPattern = /<<@(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*([a-zA-Z_]+)\s*>>/g;
/** pattern */
const EndPattern = /<<@>>/g;
/** Conditional pattern */
class IterationPattern extends conditional_1.ConditionalPattern {
    /** Parser method */
    execute() {
        this.replace(ForPattern, (match, count, variable, condition, assignment) => {
            const jsFilter = this.filter(count, this.variable(variable), this.tester(condition));
            return this.dynamic(`for (const ${assignment} of ${jsFilter}) {`);
        })
            .replace(EndPattern, () => this.dynamic('}'));
    }
    /** Returns the array filter */
    filter(count, variable, tester) {
        const slicer = typeof count === 'undefined' ? '' : `.slice(0, ${count})`;
        return `${variable}.filter${tester}${slicer}`;
    }
}
exports.IterationPattern = IterationPattern;
//# sourceMappingURL=iteration.js.map