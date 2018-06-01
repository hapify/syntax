'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const {} = require('../src/errors');
const HapifySyntax = require('../src');

const Model = require('./models/video.json');
const Input = Fs.readFileSync(`${__dirname}/masks/interpolate.hpf`, 'utf8');
const Output = Fs.readFileSync(`${__dirname}/output/interpolate.txt`, 'utf8');

lab.test('single', async () => {
    
    //Test input validity
    expect(Input).to.be.a.string();
    expect(Output).to.be.a.string();
    expect(Model).to.be.an.object();
    
    expect(HapifySyntax.single(Input, Model)).to.equal(Output);
});
