"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndentPattern = void 0;
const base_1 = require("./base");
const IndentToRemove = /^ +<<(#|<|\?\?|\?|@|if|for|else|elseif|endif|endfor)([\s\S]*?)>>/gm;
const IndentReplace = '<<$1$2>>';
/** Escape pattern */
class IndentPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(IndentToRemove, IndentReplace);
    }
}
exports.IndentPattern = IndentPattern;
//# sourceMappingURL=indent.js.map