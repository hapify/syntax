'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const HapifySyntax = require('../src');

const Model = require('./Models/video.json');
const Simple = Fs.readSync('./masks/Simple.hpf');

lab.test('constructor', async () => {
    expect(() => new HapifySyntax()).to.throw(Error);
});

lab.test('single', async () => {
    expect(() => HapifySyntax.parse()).to.throw(Error);
    
    expect(() => HapifySyntax.parse(Simple)).to.throw(Error);

    expect(() => HapifySyntax.parse(Simple, undefined)).to.throw(Error);
    expect(() => HapifySyntax.parse(Simple, null)).to.throw(Error);
    expect(() => HapifySyntax.parse(Simple, true)).to.throw(Error);
    expect(() => HapifySyntax.parse(Simple, 3)).to.throw(Error);
    expect(() => HapifySyntax.parse(Simple, 'string')).to.throw(Error);

    expect(() => HapifySyntax.parse(undefined, Model)).to.throw(Error);
    expect(() => HapifySyntax.parse(null, Model)).to.throw(Error);
    expect(() => HapifySyntax.parse(false, Model)).to.throw(Error);
    expect(() => HapifySyntax.parse(4, Model)).to.throw(Error);
    expect(() => HapifySyntax.parse({}, Model)).to.throw(Error);
    
});
