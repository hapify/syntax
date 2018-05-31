'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const {
    ConstructorError,
    ArgumentsError
} = require('../src/errors');
const HapifySyntax = require('../src');

const Model = require('./models/video.json');
const Simple = Fs.readFileSync(`${__dirname}/masks/simple.hpf`);

lab.test('constructor', async () => {
    expect(() => new HapifySyntax()).to.throw(ConstructorError);
});

lab.test('single', async () => {
    expect(() => HapifySyntax.single()).to.throw(ArgumentsError);
    
    expect(() => HapifySyntax.single(Simple)).to.throw(ArgumentsError);

    expect(() => HapifySyntax.single(Simple, undefined)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(Simple, null)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(Simple, true)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(Simple, 3)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(Simple, 'string')).to.throw(ArgumentsError);

    expect(() => HapifySyntax.single(undefined, Model)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(null, Model)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(false, Model)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single(4, Model)).to.throw(ArgumentsError);
    expect(() => HapifySyntax.single({}, Model)).to.throw(ArgumentsError);
    
    expect(() => HapifySyntax.single(Simple, Model)).to.be.a.srting();
    
});
