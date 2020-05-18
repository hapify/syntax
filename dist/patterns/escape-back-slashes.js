'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeBackSlashesPattern = void 0;
const base_1 = require("./base");
/** Escape back-slashes pattern */
class EscapeBackSlashesPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(/([\\]+)([^<>]|<<|$)/g, '$1$1$2');
    }
}
exports.EscapeBackSlashesPattern = EscapeBackSlashesPattern;
//# sourceMappingURL=escape-back-slashes.js.map