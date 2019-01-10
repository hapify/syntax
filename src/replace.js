"use strict";

const lineColumn = require("line-column");

module.exports = (template, actions, regexp, replace) => {
  let patternOffset = 0;

  return template.replace(regexp, (...params) => {
    const match = params[0];
    const offset = params[params.length - 2];

    const replaceString =
      typeof replace === "function" ? replace.apply(null, params) : replace;

    // Save the impact of this replace
    actions.push({
      index: patternOffset + offset,
      lineColumn: lineColumn(template).fromIndex(patternOffset + offset),
      before: match.length,
      after: replaceString.length
    });

    patternOffset += replaceString.length - match.length;

    return replaceString;
  });
};
