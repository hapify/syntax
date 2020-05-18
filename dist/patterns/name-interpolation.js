'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameInterpolationPattern = void 0;
const base_1 = require("./base");
const errors_1 = require("../errors");
/** Name interpolation pattern */
const RegEx = /<<([a-zA-Z_.]+)\s+([aA_\-R]+)\s*>>/g;
/** NameInterpolation pattern */
class NameInterpolationPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(RegEx, (match, variable, property) => {
            // Get the var
            let jsVariable = variable;
            if (jsVariable === 'M')
                jsVariable = 'root';
            else if (jsVariable === 'P')
                jsVariable = 'root.fields.primary';
            // Get the property
            let jsProperty = property;
            if (jsProperty === 'aA')
                jsProperty = 'camel';
            else if (jsProperty === 'AA')
                jsProperty = 'pascal';
            else if (jsProperty === 'a')
                jsProperty = 'lower';
            else if (jsProperty === 'A')
                jsProperty = 'capital';
            else if (jsProperty === 'a-a')
                jsProperty = 'kebab';
            else if (jsProperty === 'A-A')
                jsProperty = 'header';
            else if (jsProperty === 'a_a')
                jsProperty = 'snake';
            else if (jsProperty === 'A_A')
                jsProperty = 'constant';
            else if (jsProperty === 'aa')
                jsProperty = 'compact';
            else if (jsProperty === 'R')
                jsProperty = 'raw';
            else
                throw new errors_1.ParsingError(`[NameInterpolationPattern.execute] Unknown name property: ${jsProperty}`);
            return `\${${jsVariable}.names.${jsProperty}}`;
        });
    }
}
exports.NameInterpolationPattern = NameInterpolationPattern;
//# sourceMappingURL=name-interpolation.js.map