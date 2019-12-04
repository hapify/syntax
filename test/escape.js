'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = (exports.lab = Lab.script());
const HapifySyntax = require('../src');
const EscapePattern = require('../src/patterns/escape');
const EscapeBackSlashesPattern = require('../src/patterns/escape-back-slashes');

const Model = require('./models/video.json');
const Input = Fs.readFileSync(`${__dirname}/masks/escape.hpf`, 'utf8');
const Output = Fs.readFileSync(`${__dirname}/output/escape.txt`, 'utf8');

lab.test('run', async () => {
	//Test input validity
	expect(Input).to.be.a.string();
	expect(Output).to.be.a.string();
	expect(Model).to.be.an.object();

	expect(HapifySyntax.run(Input, Model)).to.equal(Output);
});

lab.test('unit', async () => {
	expect(EscapePattern.execute('\\<\\<should\\>\\>')).to.equal('<<should>>');
	expect(EscapePattern.execute('<\\<\\<should>\\>\\>')).to.equal('<<<should>>>');
});

lab.test('unit back-slashes', async () => {
	expect(EscapeBackSlashesPattern.execute('\\')).to.equal('\\\\');
	expect(EscapeBackSlashesPattern.execute('\\\n')).to.equal('\\\\\n');
	expect(EscapeBackSlashesPattern.execute('\\\\')).to.equal('\\\\\\\\');
	expect(EscapeBackSlashesPattern.execute('\\\\\n')).to.equal('\\\\\\\\\n');
});
