'use strict';

const {
    ConstructorError,
    ArgumentsError
} = require('../src/errors');

/** @type {HapifySyntax} Syntax parser */
module.exports = class HapifySyntax {

    /** Constructor */
    constructor() {
        throw new ConstructorError('[HapifySyntax] Cannot be instanced');
    }

    /**
     * Parser method
     * @param {string} template
     * @param {{}} model
     * @return {string}
     */
    static single(template, model) {

        // Check how many arguments
        if (arguments.length !== 2) {
            throw new ArgumentsError('[HapifySyntax.single] Requires two arguments');
        }
        
        // Check arguments
        if (typeof template !== 'string') {
            throw new ArgumentsError('[HapifySyntax.single] template must be a string');
        }
        if (typeof model !== 'object') {
            throw new ArgumentsError('[HapifySyntax.single] model must be an object');
        }
        
        return template;
    }

};
