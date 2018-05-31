'use strict';

module.exports = {
    /** @type ConstructorError */
    ConstructorError: class extends Error {},
    /** @type ArgumentsError */
    ArgumentsError: class extends Error {},
    /** @type ParsingError */
    ParsingError: class extends Error {},
};
