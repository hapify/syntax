'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
const BasePattern = require('./base');
const { InternalError } = require('../errors');
/** @type {RegExp} if () { pattern */
const IfPattern = /<<\?(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()[\]!+*\-/]+)?\s*>>/g;
/** @type {RegExp} else if () { pattern */
const ElseIfPattern = /<<\?\?(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()[\]!+*\-/]+)?\s*>>/g;
/** @type {RegExp} else pattern */
const ElsePattern = /<<\?\?>>/g;
/** @type {RegExp} } pattern */
const EndPattern = /<<\?>>/g;
/** @type {[{}]} Conditions short codes & operators */
const Repalcements = [
    // Operators
    { search: '*', replace: ' && ', escape: true },
    { search: '/', replace: ' && !', escape: true },
    { search: '+', replace: ' || ', escape: true },
    { search: '-', replace: ' || !', escape: true },
    // Fields properties
    { search: 'pr', replace: 'i.primary' },
    { search: 'un', replace: 'i.unique' },
    { search: 'lb', replace: 'i.label' },
    { search: 'nu', replace: 'i.nullable' },
    { search: 'ml', replace: 'i.multiple' },
    { search: 'em', replace: 'i.embedded' },
    { search: 'se', replace: 'i.searchable' },
    { search: 'so', replace: 'i.sortable' },
    { search: 'hd', replace: 'i.hidden' },
    { search: 'in', replace: 'i.internal' },
    { search: 'rs', replace: 'i.restricted' },
    { search: 'os', replace: 'i.ownership' },
    // Fields types for string
    { search: 'tSe', replace: "(i.type === 'string' && i.subtype === 'email')" },
    {
        search: 'tSp',
        replace: "(i.type === 'string' && i.subtype === 'password')"
    },
    { search: 'tSu', replace: "(i.type === 'string' && i.subtype === 'url')" },
    { search: 'tSt', replace: "(i.type === 'string' && i.subtype === 'text')" },
    { search: 'tSr', replace: "(i.type === 'string' && i.subtype === 'rich')" },
    { search: 'tS', replace: "(i.type === 'string')" },
    // Fields types for number
    {
        search: 'tNi',
        replace: "(i.type === 'number' && i.subtype === 'integer')"
    },
    { search: 'tNf', replace: "(i.type === 'number' && i.subtype === 'float')" },
    {
        search: 'tNt',
        replace: "(i.type === 'number' && i.subtype === 'latitude')"
    },
    {
        search: 'tNg',
        replace: "(i.type === 'number' && i.subtype === 'longitude')"
    },
    { search: 'tN', replace: "(i.type === 'number')" },
    // Fields types for boolean
    { search: 'tB', replace: "(i.type === 'boolean')" },
    // Fields types for datetime
    { search: 'tDd', replace: "(i.type === 'datetime' && i.subtype === 'date')" },
    { search: 'tDt', replace: "(i.type === 'datetime' && i.subtype === 'time')" },
    { search: 'tD', replace: "(i.type === 'datetime')" },
    // Fields types for entity
    { search: 'tE', replace: "(i.type === 'entity')" },
    // Fields types for object
    { search: 'tO', replace: "(i.type === 'object')" },
    // Fields types for file
    { search: 'tFi', replace: "(i.type === 'file' && i.subtype === 'image')" },
    { search: 'tFv', replace: "(i.type === 'file' && i.subtype === 'video')" },
    { search: 'tFa', replace: "(i.type === 'file' && i.subtype === 'audio')" },
    { search: 'tFd', replace: "(i.type === 'file' && i.subtype === 'document')" },
    { search: 'tF', replace: "(i.type === 'file')" },
    // Models computed properties
    { search: 'pMHd', replace: 'i.properties.mainlyHidden' },
    { search: 'pMIn', replace: 'i.properties.mainlyInternal' },
    { search: 'pGeo', replace: 'i.properties.isGeolocated' },
    { search: 'pGSe', replace: 'i.properties.isGeoSearchable' },
    // Accesses actions properties
    { search: '[ad', replace: 'i.gteAdmin', escape: true },
    { search: '[ow', replace: 'i.gteOwner', escape: true },
    { search: '[au', replace: 'i.gteAuth', escape: true },
    { search: '[gs', replace: 'i.gteGuest', escape: true },
    { search: 'ad]', replace: 'i.lteAdmin' },
    { search: 'ow]', replace: 'i.lteOwner' },
    { search: 'au]', replace: 'i.lteAuth' },
    { search: 'gs]', replace: 'i.lteGuest' },
    { search: 'ad', replace: 'i.admin' },
    { search: 'ow', replace: 'i.owner' },
    { search: 'au', replace: 'i.auth' },
    { search: 'gs', replace: 'i.guest' },
    // Accesses computed properties
    { search: 'pOAd', replace: 'i.accesses.properties.onlyAdmin' },
    { search: 'pOOw', replace: 'i.accesses.properties.onlyOwner' },
    { search: 'pOAu', replace: 'i.accesses.properties.onlyAuth' },
    { search: 'pOGs', replace: 'i.accesses.properties.onlyGuest' },
    { search: 'pMAd', replace: 'i.accesses.properties.maxAdmin' },
    { search: 'pMOw', replace: 'i.accesses.properties.maxOwner' },
    { search: 'pMAu', replace: 'i.accesses.properties.maxAuth' },
    { search: 'pMGs', replace: 'i.accesses.properties.maxGuest' },
    { search: 'pNAd', replace: 'i.accesses.properties.noAdmin' },
    { search: 'pNOw', replace: 'i.accesses.properties.noOwner' },
    { search: 'pNAu', replace: 'i.accesses.properties.noAuth' },
    { search: 'pNGs', replace: 'i.accesses.properties.noGuest' }
];
/** @type {Function} Convert replacement search for regexp */
const ForRegExp = r => `${r.escape ? '\\' : ''}${r.search}`;
/** @type {RegExp} Dynamic regex for replacements */
const Condition = new RegExp(`(${Repalcements.map(ForRegExp).join('|')})`, 'g');
/** @type {[]} Testers caching */
const Testers = {};
/** @type {ConditionalPattern} Conditional pattern */
module.exports = class ConditionalPattern extends BasePattern {
    /** Parser method */
    execute() {
        this._replace(IfPattern, (match, _count, _variable, _condition) => {
            // Get the full syntax
            const variable = this._variable(_variable);
            const tester = this._tester(_condition);
            const condition = this._condition(_count, variable, tester);
            return this._dynamic(`if (${condition}) {`);
        })
            ._replace(ElseIfPattern, (match, _count, _variable, _condition) => {
            // Get the full syntax
            const variable = this._variable(_variable);
            const tester = this._tester(_condition);
            const condition = this._condition(_count, variable, tester);
            return this._dynamic(`} else if (${condition}) {`);
        })
            ._replace(ElsePattern, () => this._dynamic('} else {'))
            ._replace(EndPattern, () => this._dynamic('}'));
    }
    /**
     * Returns the full condition to be injected in the 'if' statement
     * @param {string} _count
     * @param {string} variable
     * @param {string} tester
     * @return {string}
     */
    _condition(_count, variable, tester) {
        const threshold = typeof _count === 'undefined' ? 0 : _count - 1;
        const arrayTest = `(${variable}.filter && ${variable}.filter${tester}.length > ${threshold})`;
        const objectTest = `(!(${variable}.filter) && ${tester}(${variable}))`;
        return `${arrayTest} || ${objectTest}`;
    }
    /**
     * Convert the condition short code to tester method
     * @param {string} _condition
     * @return {string}
     */
    _tester(_condition) {
        // Short exit
        if (typeof _condition === 'undefined') {
            return '((i) => i)';
        }
        const trimed = _condition.trim();
        if (typeof Testers[trimed] === 'undefined') {
            const condition = trimed
                .replace(Condition, match => {
                const replacement = Repalcements.find(l => l.search === match);
                if (!replacement) {
                    throw new InternalError(`[ConditionalPattern._condition] Cannot find condition replacement for match: ${match} (in :${trimed})`);
                }
                return replacement.replace;
            })
                .trim()
                .replace(/^&&/g, '')
                .replace(/^\|\|/g, '')
                .trim();
            Testers[trimed] = `((i) => ${condition})`;
        }
        return Testers[trimed];
    }
    /**
     * Convert the input variable to the real variable
     * @param {string} _variable
     * @return {string}
     */
    _variable(_variable) {
        let variable = _variable;
        if (variable === 'M')
            variable = 'root';
        else if (variable === 'F')
            variable = 'root.fields.list';
        else if (variable === 'D')
            variable = 'root.dependencies';
        else if (variable === 'R')
            variable = 'root.referencedIn';
        else if (variable === 'P')
            variable = 'root.fields.primary';
        // Accesses
        else if (variable === 'A')
            variable = 'root.accesses.list';
        else if (variable === 'Ac')
            variable = 'root.accesses.create';
        else if (variable === 'Ar')
            variable = 'root.accesses.read';
        else if (variable === 'Au')
            variable = 'root.accesses.update';
        else if (variable === 'Ad')
            variable = 'root.accesses.remove';
        else if (variable === 'As')
            variable = 'root.accesses.search';
        else if (variable === 'An')
            variable = 'root.accesses.count';
        return variable;
    }
};
//# sourceMappingURL=conditional.js.map