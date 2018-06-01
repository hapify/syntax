'use strict';

const {
    ConstructorError
} = require('../errors');
const BasePattern = require('./base');

/** @type {{}} Start pattern and replacer */
const Start = {
    find: /\\<\\</g,
    replace: '<<'
};
/** @type {{}} end pattern and replacer */
const End = {
    find: /\\>\\>/g,
    replace: '>>'
};

/** @type {BasePattern} Escape pattern */
module.exports = class EscapePattern extends BasePattern {

    /**
     * Parser method
     * @param {string} template
     * @param {{}} model
     * @return {string}
     */
    static execute(template, model) {
        return template
            .replace(Start.find, Start.replace)
            .replace(End.find, End.replace);
    }

};
