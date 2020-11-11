"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameInterpolationPattern = void 0;
const base_1 = require("./base");
const errors_1 = require("../errors");
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
const Cases = [
    { search: ['aA', 'camel'], replace: 'camel' },
    { search: ['AA', 'pascal'], replace: 'pascal' },
    { search: ['a', 'lower'], replace: 'lower' },
    { search: ['A', 'capital'], replace: 'capital' },
    { search: ['a-a', 'kebab'], replace: 'kebab' },
    { search: ['A-A', 'header'], replace: 'header' },
    { search: ['a_a', 'snake'], replace: 'snake' },
    { search: ['A_A', 'constant'], replace: 'constant' },
    { search: ['aa', 'compact'], replace: 'compact' },
    { search: ['R', 'raw'], replace: 'raw' },
];
/** Convert case words for regexp */
const ForRegExp = (r) => r.search.map(escape_string_regexp_1.default).join('|');
/** Name interpolation pattern */
const RegEx = new RegExp(`<<([a-zA-Z_.]+)\\s+(${Cases.map(ForRegExp).join('|')})\\s*>>`, 'g');
/** NameInterpolation pattern */
class NameInterpolationPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(RegEx, (match, variable, property) => {
            // Get the var
            let jsVariable = variable;
            if (['M', 'Model'].includes(jsVariable))
                jsVariable = 'root';
            else if (['P', 'PrimaryField'].includes(jsVariable))
                jsVariable = 'root.fields.primary';
            // Get the property
            const matchingCase = Cases.find((c) => c.search.includes(property));
            if (!matchingCase) {
                throw new errors_1.ParsingError(`[NameInterpolationPattern.execute] Unknown name property: ${property}`);
            }
            const jsProperty = matchingCase.replace;
            return `\${${jsVariable}.names.${jsProperty}}`;
        });
    }
}
exports.NameInterpolationPattern = NameInterpolationPattern;
//# sourceMappingURL=name-interpolation.js.map