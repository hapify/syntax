"use strict";

const BasePattern = require("./base");

/** @type {{}} Start pattern and replacer */
const Start = {
  find: /\\<\\</g,
  replace: "<<"
};
/** @type {{}} end pattern and replacer */
const End = {
  find: /\\>\\>/g,
  replace: ">>"
};

/** @type {EscapePattern} Escape pattern */
module.exports = class EscapePattern extends BasePattern {
  /**
   * Parser method
   * @param {string} template
   * @return {string}
   */
  static execute(template, actions) {
    return template
      .replaceSyntaxPattern(actions, Start.find, Start.replace)
      .replaceSyntaxPattern(actions, End.find, End.replace);
  }
};
