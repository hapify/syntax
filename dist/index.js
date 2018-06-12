(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HapifySyntax = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = {
    /** @type ConstructorError */
    ConstructorError: function (_Error) {
        _inherits(ConstructorError, _Error);

        function ConstructorError() {
            _classCallCheck(this, ConstructorError);

            return _possibleConstructorReturn(this, (ConstructorError.__proto__ || Object.getPrototypeOf(ConstructorError)).apply(this, arguments));
        }

        return ConstructorError;
    }(Error),
    /** @type ArgumentsError */
    ArgumentsError: function (_Error2) {
        _inherits(ArgumentsError, _Error2);

        function ArgumentsError() {
            _classCallCheck(this, ArgumentsError);

            return _possibleConstructorReturn(this, (ArgumentsError.__proto__ || Object.getPrototypeOf(ArgumentsError)).apply(this, arguments));
        }

        return ArgumentsError;
    }(Error),
    /** @type ParsingError */
    ParsingError: function (_Error3) {
        _inherits(ParsingError, _Error3);

        function ParsingError() {
            _classCallCheck(this, ParsingError);

            return _possibleConstructorReturn(this, (ParsingError.__proto__ || Object.getPrototypeOf(ParsingError)).apply(this, arguments));
        }

        return ParsingError;
    }(Error),
    /** @type EvaluationError */
    EvaluationError: function (_Error4) {
        _inherits(EvaluationError, _Error4);

        function EvaluationError() {
            _classCallCheck(this, EvaluationError);

            return _possibleConstructorReturn(this, (EvaluationError.__proto__ || Object.getPrototypeOf(EvaluationError)).apply(this, arguments));
        }

        return EvaluationError;
    }(Error),
    /** @type InternalError */
    InternalError: function (_Error5) {
        _inherits(InternalError, _Error5);

        function InternalError() {
            _classCallCheck(this, InternalError);

            return _possibleConstructorReturn(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).apply(this, arguments));
        }

        return InternalError;
    }(Error)
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../src/errors'),
    ConstructorError = _require.ConstructorError,
    ArgumentsError = _require.ArgumentsError,
    EvaluationError = _require.EvaluationError;

var Patterns = require('./patterns');

/** @type {BasePattern[]} Ordered patterns */
var PatternsStack = [Patterns.Interpolate, Patterns.Conditional, Patterns.Iteration, Patterns.Evaluate, Patterns.Escape];

/** @type {HapifySyntax} Syntax parser */
module.exports = function () {

    /** Constructor */
    function HapifySyntax() {
        _classCallCheck(this, HapifySyntax);

        throw new ConstructorError('[HapifySyntax] Cannot be instanced');
    }

    /**
     * Parser method
     * @param {string} template
     * @param {{}} model
     * @return {string}
     */


    _createClass(HapifySyntax, null, [{
        key: 'run',
        value: function run(template, model) {

            // Check how many arguments
            if (arguments.length !== 2) {
                throw new ArgumentsError('[HapifySyntax.run] Requires two arguments');
            }

            // Check arguments
            if (typeof template !== 'string') {
                throw new ArgumentsError('[HapifySyntax.run] template must be a string');
            }
            if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) !== 'object') {
                throw new ArgumentsError('[HapifySyntax.run] model must be an object');
            }
            if (model === null) {
                throw new ArgumentsError('[HapifySyntax.run] model cannot be null');
            }

            // Escape quotes
            var output = HapifySyntax._escape(template);

            // Execute all patterns
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = PatternsStack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pattern = _step.value;

                    output = pattern.execute(output, model);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return HapifySyntax._eval(output, model);
        }

        /**
         * Escape quotes
         * @param {string} template
         * @private
         */

    }, {
        key: '_escape',
        value: function _escape(template) {
            return template.replace(/`/g, '\\`');
        }

        /**
         * Eval the generated script
         * @param {string} template
         * @param {{}|{}[]} root
         * @private
         */

    }, {
        key: '_eval',
        value: function _eval(template, root) {
            // eslint-disable-line no-unused-vars
            var final = 'let out = `' + template + '`; module.exports = out;';

            try {
                return eval(final);
            } catch (error) {
                HapifySyntax._log('[HapifySyntax._eval] An error occurred during evaluation\n\n' + error + '\n\n' + final);
                throw new EvaluationError(error.message);
            }
        }

        /**
         * Log something
         * @private
         */

    }, {
        key: '_log',
        value: function _log() /* arguments */{
            var _console;

            (_console = console).log.apply(_console, arguments); // eslint-disable-line no-console
        }
    }]);

    return HapifySyntax;
}();

},{"../src/errors":1,"./patterns":7}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../errors'),
    ConstructorError = _require.ConstructorError;

/** @type {BasePattern} Abstract base pattern */


module.exports = function () {

    /** Constructor */
    function BasePattern() {
        _classCallCheck(this, BasePattern);

        throw new ConstructorError('[BasePattern] Cannot be instanced');
    }

    /**
     * Parser method
     * @param {string} template
     * @return {string}
     */


    _createClass(BasePattern, null, [{
        key: 'execute',
        value: function execute(template) {
            return template;
        }

        /**
         * Escape string and insert js code
         * @param {string} js
         * @return {string}
         * @private
         */

    }, {
        key: '_dynamic',
        value: function _dynamic(js) {
            return '`; ' + js + ' out += `';
        }

        /**
         * Reverse escape quotes `
         * @param {string} code
         * @return {string}
         */

    }, {
        key: '_unescape',
        value: function _unescape(code) {
            return code.replace(/\\`/g, '`');
        }
    }]);

    return BasePattern;
}();

},{"../errors":1}],4:[function(require,module,exports){
'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasePattern = require('./base');

var _require = require('../errors'),
    InternalError = _require.InternalError;

/** @type {RegExp} if () { pattern */


var IfPattern = /<<\?(\d)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*>>/g;
/** @type {RegExp} else if () { pattern */
var ElseIfPattern = /<<\?\?(\d)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*>>/g;
/** @type {RegExp} else pattern */
var ElsePattern = /<<\?\?>>/g;
/** @type {RegExp} } pattern */
var EndPattern = /<<\?>>/g;
/** @type {[{}]} Conditions short codes & operators */
var Repalcements = [{ search: '*', replace: ' && ', escape: true }, { search: '/', replace: ' && !', escape: true }, { search: '+', replace: ' || ', escape: true }, { search: '-', replace: ' || !', escape: true }, { search: 'pr', replace: 'i.primary' }, { search: 'un', replace: 'i.unique' }, { search: 'lb', replace: 'i.label' }, { search: 'nu', replace: 'i.nullable' }, { search: 'ml', replace: 'i.multiple' }, { search: 'se', replace: 'i.searchable' }, { search: 'so', replace: 'i.sortable' }, { search: 'ip', replace: 'i.isPrivate' }, { search: 'in', replace: 'i.internal' }, { search: 'tSe', replace: 'i.type === \'string\' && i.subtype === \'email\'' }, { search: 'tSp', replace: 'i.type === \'string\' && i.subtype === \'password\'' }, { search: 'tSt', replace: 'i.type === \'string\' && i.subtype === \'text\'' }, { search: 'tS', replace: 'i.type === \'string\'' }, { search: 'tNi', replace: 'i.type === \'number\' && i.subtype === \'integer\'' }, { search: 'tNf', replace: 'i.type === \'number\' && i.subtype === \'float\'' }, { search: 'tNt', replace: 'i.type === \'number\' && i.subtype === \'latitude\'' }, { search: 'tNg', replace: 'i.type === \'number\' && i.subtype === \'longitude\'' }, { search: 'tN', replace: 'i.type === \'number\'' }, { search: 'tB', replace: 'i.type === \'boolean\'' }, { search: 'tDd', replace: 'i.type === \'datetime\' && i.subtype === \'date\'' }, { search: 'tDt', replace: 'i.type === \'datetime\' && i.subtype === \'time\'' }, { search: 'tD', replace: 'i.type === \'datetime\'' }, { search: 'tE', replace: 'i.type === \'entity\'' }];
/** @type {Function} Convert replacement search for regexp */
var ForRegExp = function ForRegExp(r) {
    return '' + (r.escape ? '\\' : '') + r.search;
};
/** @type {RegExp} Dynamic regex for replacements */
var Condition = new RegExp('(' + Repalcements.map(ForRegExp).join('|') + ')', 'g');
/** @type {[]} Testers caching */
var Testers = {};

/** @type {ConditionalPattern} Conditional pattern */
module.exports = function (_BasePattern) {
    _inherits(ConditionalPattern, _BasePattern);

    function ConditionalPattern() {
        _classCallCheck(this, ConditionalPattern);

        return _possibleConstructorReturn(this, (ConditionalPattern.__proto__ || Object.getPrototypeOf(ConditionalPattern)).apply(this, arguments));
    }

    _createClass(ConditionalPattern, null, [{
        key: 'execute',


        /**
         * Parser method
         * @param {string} template
         * @return {string}
         */
        value: function execute(template) {

            return template.replace(IfPattern, function (match, _count, _variable, _condition) {

                // Get the full syntax
                var variable = ConditionalPattern._variable(_variable);
                var tester = ConditionalPattern._tester(_condition);
                var condition = ConditionalPattern._condition(_count, variable, tester);

                return ConditionalPattern._dynamic('if (' + condition + ') {');
            }).replace(ElseIfPattern, function (match, _count, _variable, _condition) {

                // Get the full syntax
                var variable = ConditionalPattern._variable(_variable);
                var tester = ConditionalPattern._tester(_condition);
                var condition = ConditionalPattern._condition(_count, variable, tester);

                return ConditionalPattern._dynamic('} else if (' + condition + ') {');
            }).replace(ElsePattern, function () {
                return ConditionalPattern._dynamic('} else {');
            }).replace(EndPattern, function () {
                return ConditionalPattern._dynamic('}');
            });
        }

        /**
         * Returns the full condition to be injected in the 'if' statement
         * @param {string} _count
         * @param {string} variable
         * @param {string} tester
         * @return {string}
         */

    }, {
        key: '_condition',
        value: function _condition(_count, variable, tester) {
            var threshold = typeof _count === 'undefined' ? 0 : _count - 1;
            var arrayTest = '(' + variable + ' instanceof Array && ' + variable + '.filter' + tester + '.length > ' + threshold + ')';
            var objectTest = '(!(' + variable + ' instanceof Array) && ' + tester + '(' + variable + '))';

            return arrayTest + ' || ' + objectTest;
        }

        /**
         * Convert the condition short code to tester method
         * @param {string} _condition
         * @return {string}
         */

    }, {
        key: '_tester',
        value: function _tester(_condition) {

            // Short exit
            if (typeof _condition === 'undefined') {
                return '((i) => i)';
            }

            var trimed = _condition.trim();

            if (typeof Testers[trimed] === 'undefined') {

                var condition = trimed.replace(Condition, function (match) {
                    var replacement = Repalcements.find(function (l) {
                        return l.search === match;
                    });
                    if (!replacement) {
                        throw new InternalError('[ConditionalPattern._condition] Cannot find condition replacement for ' + match);
                    }

                    return replacement.replace;
                }).trim().replace(/^&&/g, '').replace(/^\|\|/g, '').trim();

                Testers[trimed] = '((i) => ' + condition + ')';
            }

            return Testers[trimed];
        }

        /**
         * Convert the input variable to the real variable
         * @param {string} _variable
         * @return {string}
         */

    }, {
        key: '_variable',
        value: function _variable(_variable2) {

            var variable = _variable2;
            if (variable === '_') variable = 'root';else if (variable === 'F') variable = 'root.fields.list';else if (variable === 'D') variable = 'root.dependencies.list';else if (variable === 'R') variable = 'root.referencedIn';else if (variable === 'P') variable = 'root.fields.primary';

            return variable;
        }
    }]);

    return ConditionalPattern;
}(BasePattern);

},{"../errors":1,"./base":3}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasePattern = require('./base');

/** @type {{}} Start pattern and replacer */
var Start = {
    find: /\\<\\</g,
    replace: '<<'
};
/** @type {{}} end pattern and replacer */
var End = {
    find: /\\>\\>/g,
    replace: '>>'
};

/** @type {EscapePattern} Escape pattern */
module.exports = function (_BasePattern) {
    _inherits(EscapePattern, _BasePattern);

    function EscapePattern() {
        _classCallCheck(this, EscapePattern);

        return _possibleConstructorReturn(this, (EscapePattern.__proto__ || Object.getPrototypeOf(EscapePattern)).apply(this, arguments));
    }

    _createClass(EscapePattern, null, [{
        key: 'execute',


        /**
         * Parser method
         * @param {string} template
         * @return {string}
         */
        value: function execute(template) {
            return template.replace(Start.find, Start.replace).replace(End.find, End.replace);
        }
    }]);

    return EscapePattern;
}(BasePattern);

},{"./base":3}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasePattern = require('./base');

/** @type {RegExp} Interpolation pattern */
var RegEx = /<<<([\s\S]+?)>>>/g;

/** @type {EvaluatePattern} Evaluate pattern */
module.exports = function (_BasePattern) {
    _inherits(EvaluatePattern, _BasePattern);

    function EvaluatePattern() {
        _classCallCheck(this, EvaluatePattern);

        return _possibleConstructorReturn(this, (EvaluatePattern.__proto__ || Object.getPrototypeOf(EvaluatePattern)).apply(this, arguments));
    }

    _createClass(EvaluatePattern, null, [{
        key: 'execute',


        /**
         * Parser method
         * @param {string} template
         * @return {string}
         */
        value: function execute(template) {
            return template.replace(RegEx, function (match, _code) {
                return EvaluatePattern._dynamic(EvaluatePattern._unescape(_code));
            });
        }
    }]);

    return EvaluatePattern;
}(BasePattern);

},{"./base":3}],7:[function(require,module,exports){
'use strict';

module.exports = {
    Conditional: require('./conditional'),
    Escape: require('./escape'),
    Interpolate: require('./interpolate'),
    Evaluate: require('./evaluate'),
    Iteration: require('./iteration')
};

},{"./conditional":4,"./escape":5,"./evaluate":6,"./interpolate":8,"./iteration":9}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasePattern = require('./base');

var _require = require('../errors'),
    ParsingError = _require.ParsingError;

/** @type {RegExp} Interpolation pattern */


var RegEx = /<<([a-zA-Z_.]+)\s+([aA_\-R]+)\s*>>/g;

/** @type {InterpolatePattern} Interpolate pattern */
module.exports = function (_BasePattern) {
    _inherits(InterpolatePattern, _BasePattern);

    function InterpolatePattern() {
        _classCallCheck(this, InterpolatePattern);

        return _possibleConstructorReturn(this, (InterpolatePattern.__proto__ || Object.getPrototypeOf(InterpolatePattern)).apply(this, arguments));
    }

    _createClass(InterpolatePattern, null, [{
        key: 'execute',


        /**
         * Parser method
         * @param {string} template
         * @return {string}
         */
        value: function execute(template) {

            return template.replace(RegEx, function (match, _variable, _property) {

                // Get the var
                var variable = _variable;
                if (variable === '_') variable = 'root';else if (variable === 'P') variable = 'root.fields.primary';

                // Get the property
                var property = _property;
                if (property === 'aA') property = 'lowerCamel';else if (property === 'AA') property = 'upperCamel';else if (property === 'a') property = 'wordsLower';else if (property === 'A') property = 'wordsUpper';else if (property === 'a-a') property = 'hyphen';else if (property === 'a_a') property = 'underscore';else if (property === 'aa') property = 'oneWord';else if (property === 'R') property = 'raw';else throw new ParsingError('[InterpolatePattern.execute] Unknown name property: ' + property);

                return '${' + variable + '.names.' + property + '}';
            });
        }
    }]);

    return InterpolatePattern;
}(BasePattern);

},{"../errors":1,"./base":3}],9:[function(require,module,exports){
'use strict';
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConditionalPattern = require('./conditional');

/** @type {RegExp} for() { pattern */
var ForPattern = /<<@(\d)?\s+([a-zA-Z_.]+)(\s+[a-zA-Z()!+*\-/]+)?\s*([a-zA-Z_]+)\s*>>/g;
/** @type {RegExp} } pattern */
var EndPattern = /<<@>>/g;

/** @type {IterationPattern} Conditional pattern */
module.exports = function (_ConditionalPattern) {
    _inherits(IterationPattern, _ConditionalPattern);

    function IterationPattern() {
        _classCallCheck(this, IterationPattern);

        return _possibleConstructorReturn(this, (IterationPattern.__proto__ || Object.getPrototypeOf(IterationPattern)).apply(this, arguments));
    }

    _createClass(IterationPattern, null, [{
        key: 'execute',


        /**
         * Parser method
         * @param {string} template
         * @return {string}
         */
        value: function execute(template) {

            return template.replace(ForPattern, function (match, _count, _variable, _condition, _assignment) {

                // Get the full syntax
                var variable = IterationPattern._variable(_variable);
                var tester = IterationPattern._tester(_condition);
                var filter = IterationPattern._filter(_count, variable, tester);

                return IterationPattern._dynamic('for (const ' + _assignment + ' of ' + filter + ') {');
            }).replace(EndPattern, function () {
                return IterationPattern._dynamic('}');
            });
        }

        /**
         * Returns the array filter
         * @param {string} _count
         * @param {string} variable
         * @param {string} tester
         * @return {string}
         */

    }, {
        key: '_filter',
        value: function _filter(_count, variable, tester) {
            var slicer = typeof _count === 'undefined' ? '' : '.slice(0, ' + _count + ')';

            return variable + '.filter' + tester + slicer;
        }
    }]);

    return IterationPattern;
}(ConditionalPattern);

},{"./conditional":4}]},{},[2])(2)
});
//# sourceMappingURL=index.js.map
