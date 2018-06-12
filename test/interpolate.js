'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { ParsingError } = require('../src/errors');
const HapifySyntax = require('../src');
const InterpolatePattern = require('../src/patterns/interpolate');

const Model = require('./models/video.json');
const Input = Fs.readFileSync(`${__dirname}/masks/interpolate.hpf`, 'utf8');
const InputError = Fs.readFileSync(`${__dirname}/masks/interpolate-error.hpf`, 'utf8');
const Output = Fs.readFileSync(`${__dirname}/output/interpolate.txt`, 'utf8');

lab.test('run', async () => {

    //Test input validity
    expect(Input).to.be.a.string();
    expect(Output).to.be.a.string();
    expect(Model).to.be.an.object();

    expect(HapifySyntax.run(Input, Model)).to.equal(Output);
});

lab.test('error', async () => {

    //Test input validity
    expect(InputError).to.be.a.string();
    expect(Model).to.be.an.object();

    expect(() => HapifySyntax.run(InputError, Model)).to.throw(ParsingError);
});

lab.test('unit', async () => {
    // Names
    expect(InterpolatePattern.execute('<<_ aA>>')).to.equal('${root.names.lowerCamel}');
    expect(InterpolatePattern.execute('<<_ AA>>')).to.equal('${root.names.upperCamel}');
    expect(InterpolatePattern.execute('<<_ a>>')).to.equal('${root.names.wordsLower}');
    expect(InterpolatePattern.execute('<<_ A>>')).to.equal('${root.names.wordsUpper}');
    expect(InterpolatePattern.execute('<<_ a-a>>')).to.equal('${root.names.hyphen}');
    expect(InterpolatePattern.execute('<<_ a_a>>')).to.equal('${root.names.underscore}');
    expect(InterpolatePattern.execute('<<_ aa>>')).to.equal('${root.names.oneWord}');
    expect(InterpolatePattern.execute('<<_ R>>')).to.equal('${root.names.raw}');
    // Variable
    expect(InterpolatePattern.execute('<<f aA>>')).to.equal('${f.names.lowerCamel}');
    // Spaces
    expect(InterpolatePattern.execute('<<f   aA>>')).to.equal('${f.names.lowerCamel}');
});
