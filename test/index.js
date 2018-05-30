'use strict';

const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const HapifySyntax = require('../src');

lab.test('success', async () => {
    expect(() => new HapifySyntax()).to.throw(Error);
});
