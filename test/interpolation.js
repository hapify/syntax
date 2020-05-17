'use strict';

const Fs = require('fs');
const { expect } = require('@hapi/code');
require('mocha');
const HapifySyntax = require('../src');
const InterpolationPattern = require('../src/patterns/interpolation');

const Model = require('./models/video.json');
const Input = Fs.readFileSync(`${__dirname}/masks/interpolation.hpf`, 'utf8');
const Output = Fs.readFileSync(`${__dirname}/output/interpolation.txt`, 'utf8');

describe('interpolation', () => {
	it('run', async () => {
		//Test input validity
		expect(Input).to.be.a.string();
		expect(Output).to.be.a.string();
		expect(Model).to.be.an.object();

		expect(HapifySyntax.run(Input, Model)).to.equal(Output);
	});

	it('unit', async () => {
		// Names
		expect(InterpolationPattern.execute('<<=test.custom.prop>>')).to.equal('`;\nout += test.custom.prop;\nout += `');
		expect(InterpolationPattern.execute('<<=test.custom.prop.join(`${f.name}`) >>')).to.equal('`;\nout += test.custom.prop.join(`${f.name}`) ;\nout += `');
	});
});
