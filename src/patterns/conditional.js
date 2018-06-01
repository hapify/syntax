'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

const BasePattern = require('./base');

const { InternalError } = require('../errors');

/** @type {RegExp} Start pattern */
const Start = /<<\?(\d)?\s+([a-zA-Z_]+)(\s+[a-zA-Z\(\)\!\+\*\-\/]+)?\s*>>/gm;
/** @type {RegExp} end pattern */
const End = /<<\?>>/gm;
/** @type {[{}]} Conditions short codes & operators */
const Repalcements = [
    { search: '*', replace: '&&', escape: true },
    { search: '/', replace: '&&!', escape: true },
    { search: '+', replace: '||', escape: true },
    { search: '-', replace: '||!', escape: true },
    { search: 'pr', replace: 'item.primary' },
    { search: 'un', replace: 'item.unique' },
    { search: 'lb', replace: 'item.label' },
    { search: 'nu', replace: 'item.nullable' },
    { search: 'ml', replace: 'item.multiple' },
    { search: 'se', replace: 'item.searchable' },
    { search: 'so', replace: 'item.sortable' },
    { search: 'ip', replace: 'item.isPrivate' },
    { search: 'in', replace: 'item.internal' },
];
/** @type {Function} Convert replacement search for regexp */
const ForRegExp = (r) => `${r.escape ? '\\' : ''}'${r.search}`;
/** @type {RegExp} Dynamic regex for replacements */
const Condition = new RegExp(`(${Repalcements.map(ForRegExp).join('|')})`, 'g');

/** @type {BasePattern} Conditional pattern */
module.exports = class ConditionalPattern extends BasePattern {

    /**
     * Parser method
     * @param {string} template
     * @return {string}
     */
    static execute(template) {

        return template
            .replace(Start, (match, _count, _variable, _condition) => {

                // Get the var
                let variable = _variable;
                if (variable === '_') variable = 'root';
                else if (variable === 'F') variable = 'root.fields.list';
                else if (variable === 'D') variable = 'root.dependencies.list';
                else if (variable === 'R') variable = 'root.referencedIn';

                // Tester
                const condition = ConditionalPattern._condition(_condition);
                const tester = `((item) => ${condition})`;
                
                // Write IF syntax
                const slice = typeof _count !== 'undefined' ? `.slice(${_count})` : '';
                const arrayTest = `${variable} instance Array && (${variable}${slice}.filter(())`;
                const line = `if () {`;

                return match;
            });
    }

    /**
     * Convert the condition short code to full condition
     * @param {string} _condition
     * @return {string}
     */
    static _condition(_condition) {
        return _condition
            .replace(Condition, (match) => {
                const replacement = Repalcements.find((l) => l.search === match);
                if (replacement === null) {
                    throw new InternalError(`[ConditionalPattern._condition] Cannot find condition replacement for ${match}`);
                }
                
                return replacement.replace;
            });
    }

};
