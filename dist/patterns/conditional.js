"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalPattern = void 0;
const base_1 = require("./base");
const errors_1 = require("../errors");
/** if () { pattern */
const IfPattern = /<<\?(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()[\]!+*\-/]+)?\s*>>/g;
/** else if () { pattern */
const ElseIfPattern = /<<\?\?(\d+)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()[\]!+*\-/]+)?\s*>>/g;
/** else pattern */
const ElsePattern = /<<\?\?>>/g;
/** } pattern */
const EndPattern = /<<\?>>/g;
/** Conditions short codes & operators */
const Replacements = [
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
        replace: "(i.type === 'string' && i.subtype === 'password')",
    },
    { search: 'tSu', replace: "(i.type === 'string' && i.subtype === 'url')" },
    { search: 'tSt', replace: "(i.type === 'string' && i.subtype === 'text')" },
    { search: 'tSr', replace: "(i.type === 'string' && i.subtype === 'rich')" },
    { search: 'tS', replace: "(i.type === 'string')" },
    // Fields types for number
    {
        search: 'tNi',
        replace: "(i.type === 'number' && i.subtype === 'integer')",
    },
    { search: 'tNf', replace: "(i.type === 'number' && i.subtype === 'float')" },
    {
        search: 'tNt',
        replace: "(i.type === 'number' && i.subtype === 'latitude')",
    },
    {
        search: 'tNg',
        replace: "(i.type === 'number' && i.subtype === 'longitude')",
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
    { search: 'pNGs', replace: 'i.accesses.properties.noGuest' },
];
/** Convert replacement search for regexp */
const ForRegExp = (r) => `${r.escape ? '\\' : ''}${r.search}`;
/** Dynamic regex for replacements */
const Condition = new RegExp(`(${Replacements.map(ForRegExp).join('|')})`, 'g');
/** Testers caching */
const Testers = {};
/** Conditional pattern */
class ConditionalPattern extends base_1.BasePattern {
    /** Parser method */
    execute() {
        this.replace(IfPattern, (match, count, variable, condition) => {
            const jsCondition = this.condition(count, this.variable(variable), this.tester(condition));
            return this.dynamic(`if (${jsCondition}) {`);
        })
            .replace(ElseIfPattern, (match, count, variable, condition) => {
            const jsCondition = this.condition(count, this.variable(variable), this.tester(condition));
            return this.dynamic(`} else if (${jsCondition}) {`);
        })
            .replace(ElsePattern, () => this.dynamic('} else {'))
            .replace(EndPattern, () => this.dynamic('}'));
    }
    /** Returns the full condition to be injected in the 'if' statement */
    condition(count, variable, tester) {
        const threshold = typeof count === 'undefined' ? 0 : Number(count) - 1;
        const arrayTest = `(${variable}.filter && ${variable}.filter${tester}.length > ${threshold})`;
        const objectTest = `(!(${variable}.filter) && ${tester}(${variable}))`;
        return `${arrayTest} || ${objectTest}`;
    }
    /** Convert the condition short code to tester method */
    tester(condition) {
        // Quick exit
        if (typeof condition === 'undefined') {
            return '((i) => i)';
        }
        const trimmed = condition.trim();
        if (typeof Testers[trimmed] === 'undefined') {
            const condition = trimmed
                .replace(Condition, (match) => {
                const replacement = Replacements.find((l) => l.search === match);
                if (!replacement) {
                    throw new errors_1.InternalError(`[ConditionalPattern.tester] Cannot find condition replacement for match: ${match} (in :${trimmed})`);
                }
                return replacement.replace;
            })
                .trim()
                .replace(/^&&/g, '')
                .replace(/^\|\|/g, '')
                .trim();
            Testers[trimmed] = `((i) => ${condition})`;
        }
        return Testers[trimmed];
    }
    /** Convert the input variable to the real variable */
    variable(variable) {
        if (variable === 'M')
            return 'root';
        else if (variable === 'F')
            return 'root.fields.list';
        else if (variable === 'D')
            return 'root.dependencies';
        else if (variable === 'R')
            return 'root.referencedIn';
        else if (variable === 'P')
            return 'root.fields.primary';
        // Accesses
        else if (variable === 'A')
            return 'root.accesses.list';
        else if (variable === 'Ac')
            return 'root.accesses.create';
        else if (variable === 'Ar')
            return 'root.accesses.read';
        else if (variable === 'Au')
            return 'root.accesses.update';
        else if (variable === 'Ad')
            return 'root.accesses.remove';
        else if (variable === 'As')
            return 'root.accesses.search';
        else if (variable === 'An')
            return 'root.accesses.count';
        return variable;
    }
}
exports.ConditionalPattern = ConditionalPattern;
//# sourceMappingURL=conditional.js.map