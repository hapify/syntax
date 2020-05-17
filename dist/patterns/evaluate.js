'use strict';
const BasePattern = require('./base');
/** @type {RegExp} Evaluation pattern */
const RegEx = /<<<([\s\S]+?)>>>/g;
/** @type {EvaluatePattern} Evaluate pattern */
module.exports = class EvaluatePattern extends BasePattern {
    /** Parser method */
    execute() {
        this._replace(RegEx, (match, _code) => this._dynamic(this._unescape(_code)));
    }
};
//# sourceMappingURL=evaluate.js.map