'use strict';
const BasePattern = require('./base');
/** @type {RegExp} Interpolation pattern */
const RegEx = /<<=([\s\S]+?)>>/g;
/** @type {InterpolationPattern} Interpolation pattern */
module.exports = class InterpolationPattern extends BasePattern {
    /** Parser method */
    execute() {
        this._replace(RegEx, (match, _code) => this._dynamic(`out += ${this._unescape(_code)};`));
    }
};
//# sourceMappingURL=interpolation.js.map