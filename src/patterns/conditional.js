'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

const BasePattern = require('./base');

const { InternalError } = require('../errors');

/** @type {RegExp} if () { pattern */
const IfPattern = /<<\?(\d)?\s+([a-zA-Z_]+)(\s+[a-zA-Z()!+*\-/]+)?\s*>>/gm;
/** @type {RegExp} else if () { pattern */
const ElseIfPattern = /<<\?\?(\d)?\s+([a-zA-Z_]+)(\s+[a-zA-Z()!+*\-/]+)?\s*>>/gm;
/** @type {RegExp} else pattern */
const ElsePattern = /<<\?\?>>/gm;
/** @type {RegExp} } pattern */
const EndPattern = /<<\?>>/gm;
/** @type {[{}]} Conditions short codes & operators */
const Repalcements = [
    { search: '*', replace: ' && ', escape: true },
    { search: '/', replace: ' && !', escape: true },
    { search: '+', replace: ' || ', escape: true },
    { search: '-', replace: ' || !', escape: true },
    { search: 'pr', replace: 'i.primary' },
    { search: 'un', replace: 'i.unique' },
    { search: 'lb', replace: 'i.label' },
    { search: 'nu', replace: 'i.nullable' },
    { search: 'ml', replace: 'i.multiple' },
    { search: 'se', replace: 'i.searchable' },
    { search: 'so', replace: 'i.sortable' },
    { search: 'ip', replace: 'i.isPrivate' },
    { search: 'in', replace: 'i.internal' },

    { search: 'tSe', replace: 'i.type === \'string\' && i.subtype === \'email\'' },
    { search: 'tSp', replace: 'i.type === \'string\' && i.subtype === \'password\'' },
    { search: 'tSt', replace: 'i.type === \'string\' && i.subtype === \'text\'' },
    { search: 'tS', replace: 'i.type === \'string\'' },

    { search: 'tNi', replace: 'i.type === \'number\' && i.subtype === \'integer\'' },
    { search: 'tNf', replace: 'i.type === \'number\' && i.subtype === \'float\'' },
    { search: 'tNt', replace: 'i.type === \'number\' && i.subtype === \'latitude\'' },
    { search: 'tNg', replace: 'i.type === \'number\' && i.subtype === \'longitude\'' },
    { search: 'tN', replace: 'i.type === \'number\'' },

    { search: 'tB', replace: 'i.type === \'boolean\'' },
    
    { search: 'tDd', replace: 'i.type === \'datetime\' && i.subtype === \'date\'' },
    { search: 'tDt', replace: 'i.type === \'datetime\' && i.subtype === \'time\'' },
    { search: 'tD', replace: 'i.type === \'datetime\'' },
    
    { search: 'tE', replace: 'i.type === \'entity\'' },
];
/** @type {Function} Convert replacement search for regexp */
const ForRegExp = (r) => `${r.escape ? '\\' : ''}${r.search}`;
/** @type {RegExp} Dynamic regex for replacements */
const Condition = new RegExp(`(${Repalcements.map(ForRegExp).join('|')})`, 'g');

/** @type {BasePattern} Conditional pattern */
module.exports = class ConditionalPattern extends BasePattern {

    /**
     * Getter for subclasses
     * @return {[{}]}
     * @private
     */
    static _getReplacements() {
        return Repalcements;
    }
    /**
     * Getter for subclasses
     * @return {RegExp}
     * @private
     */
    static _getCondition() {
        return Condition;
    }

    /**
     * Parser method
     * @param {string} template
     * @return {string}
     */
    static execute(template) {

        return template
            .replace(IfPattern, (match, _count, _variable, _condition) => {

                // Get the full syntax
                const variable = ConditionalPattern._variable(_variable);
                const tester = ConditionalPattern._tester(_condition);
                const condition = ConditionalPattern._condition(_count, variable, tester);

                return ConditionalPattern._dynamic(`if (${condition}) {`);
            })
            .replace(ElseIfPattern, (match, _count, _variable, _condition) => {

                // Get the full syntax
                const variable = ConditionalPattern._variable(_variable);
                const tester = ConditionalPattern._tester(_condition);
                const condition = ConditionalPattern._condition(_count, variable, tester);

                return ConditionalPattern._dynamic(`} else if (${condition}) {`);
            })
            .replace(ElsePattern, () => ConditionalPattern._dynamic('} else {'))
            .replace(EndPattern, () => ConditionalPattern._dynamic('}'));
    }

    /**
     * Returns the full condition to be injected in the 'if' statement
     * @param {string} _count
     * @param {string} variable
     * @param {string} tester
     * @return {string}
     */
    static _condition(_count, variable, tester) {
        const threshold = typeof _count === 'undefined' ? 0 : _count - 1;
        const arrayTest = `(${variable} instanceof Array && ${variable}.filter${tester}.length > ${threshold})`;
        const objectTest = `(!(${variable} instanceof Array) && ${tester}(${variable}))`;
        
        return `${arrayTest} || ${objectTest}`;
    }

    /**
     * Convert the condition short code to tester method
     * @param {string} _condition
     * @return {string}
     */
    static _tester(_condition) {

        const condition = typeof _condition === 'undefined' ? 'i' : _condition
            .trim()
            .replace(Condition, (match) => {
                const replacement = Repalcements.find((l) => l.search === match);
                if (!replacement) {
                    throw new InternalError(`[ConditionalPattern._condition] Cannot find condition replacement for ${match}`);
                }

                return replacement.replace;
            })
            .trim()
            .replace(/^&&/g, '')
            .replace(/^\|\|/g, '')
            .trim();

        return `((i) => ${condition})`;
    }

    /**
     * Convert the input variable to the real variable
     * @param {string} _variable
     * @return {string}
     */
    static _variable(_variable) {

        let variable = _variable;
        if (variable === '_') variable = 'root';
        else if (variable === 'F') variable = 'root.fields.list';
        else if (variable === 'D') variable = 'root.dependencies.list';
        else if (variable === 'R') variable = 'root.referencedIn';
        
        return variable;
    }

};
