'use strict';

const {
    ConstructorError,
    ArgumentsError,
    EvaluationError
} = require('../src/errors');
const Patterns = require('./patterns');

/** @type {BasePattern[]} Ordered patterns */
const PatternsStack = [
    Patterns.Interpolate,
    Patterns.Escape
];

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
        if (model === null) {
            throw new ArgumentsError('[HapifySyntax.single] model cannot be null');
        }
        
        // Escape quotes
        let output = HapifySyntax._escape(template);
        
        // Execute all patterns
        for (const pattern of PatternsStack) {
            output = pattern.execute(output, model);
        }
        
        return HapifySyntax._eval(output, model);
    }

    /**
     * Escape quotes
     * @param {string} template
     * @private
     */
    static _escape(template) {
        return template.replace(/`/g, /\\`/);
    }

    /**
     * Eval the generated script
     * @param {string} template
     * @param {{}} model
     * @private
     */
    static _eval(template, model) { // eslint-disable-line no-unused-vars
        const final = `module.exports = \`${template}\`;`;

        try {
            return eval(final);
        }
        catch (error) {
            HapifySyntax._log(`[HapifySyntax._eval] An error occurred during evaluation\n\n${error}\n\n${final}`);
            throw new EvaluationError(error.message);
        }
    }

    /**
     * Log something
     * @private
     */
    static _log(/* arguments */) {
        console.log(...arguments); // eslint-disable-line no-console
    }

};
