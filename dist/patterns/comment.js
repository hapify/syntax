"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPattern = void 0;
const base_1 = require("./base");
/** Comment pattern */
const RegEx = /<<#([\s\S]+?)>>/g;
/** Comment pattern */
class CommentPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(RegEx, '');
    }
}
exports.CommentPattern = CommentPattern;
//# sourceMappingURL=comment.js.map