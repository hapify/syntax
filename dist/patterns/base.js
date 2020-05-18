'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePattern = void 0;
const line_column_1 = __importDefault(require("line-column"));
/** Abstract base pattern */
class BasePattern {
    constructor(parent) {
        this.parent = parent;
    }
    /** Parser method */
    execute() {
        /* Do Nothing */
    }
    /** Escape string and insert js code */
    dynamic(js) {
        return `\`;
${js}
out += \``;
    }
    /** Reverse escape signs ` $ \ escaped by EscapeQuotesPattern & EscapeBackSlashesPattern */
    unescape(code) {
        return code
            .replace(/\\\\/g, '\\')
            .replace(/\\`/g, '`')
            .replace(/\\\$/g, '$');
    }
    /** Perform a regex replacement and saves the actions made on the string */
    replace(regexp, replace) {
        let patternOffset = 0;
        this.parent.template = this.parent.template.replace(regexp, (...params) => {
            const match = params[0];
            const offset = Number(params[params.length - 2]);
            const replaceString = typeof replace === 'function' ? replace.apply(null, params) : match.replace(regexp, replace);
            // Save the impact of this replacement
            this.parent.actions.push({
                index: patternOffset + offset,
                lineColumn: line_column_1.default(this.parent.template).fromIndex(patternOffset + offset),
                before: match.length,
                after: replaceString.length
            });
            patternOffset += replaceString.length - match.length;
            return replaceString;
        });
        return this;
    }
    /** Static parser method used for testing purpose */
    static execute(template) {
        // Create a fake parent
        const parent = { template, actions: [] };
        // Init an instance
        const pattern = new this(parent);
        // Execute the pattern and return the modified template
        pattern.execute();
        return parent.template;
    }
}
exports.BasePattern = BasePattern;
//# sourceMappingURL=base.js.map