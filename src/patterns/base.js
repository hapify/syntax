'use strict';

const { ConstructorError } = require('../errors');

/** @type {BasePattern} Abstract base pattern */
module.exports = class BasePattern {

    /** Constructor */
    constructor() {
        throw new ConstructorError('[BasePattern] Cannot be instanced');
    }

    /**
     * Parser method
     * @param {string} template
     * @param {{}} model
     * @return {string}
     */
    static execute(template, model) {
        return template;
    }

};
