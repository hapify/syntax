'use strict';

const Fs = require('fs');
const { expect } = require('@hapi/code');
require('mocha');
const HapifySyntax = require('../src');
const CommentPattern = require('../src/patterns/comment');

const Model = require('./models/video.json');
const Input = Fs.readFileSync(`${__dirname}/masks/comment.hpf`, 'utf8');
const Output = Fs.readFileSync(`${__dirname}/output/comment.txt`, 'utf8');

describe('comment', () => {
	it('run', async () => {
		//Test input validity
		expect(Input).to.be.a.string();
		expect(Output).to.be.a.string();
		expect(Model).to.be.an.object();

		expect(HapifySyntax.run(Input, Model)).to.equal(Output);
	});

	it('unit', async () => {
		// Names
		expect(CommentPattern.execute('<<#this should be removed>>')).to.equal('');
		expect(CommentPattern.execute('This<<#this should be removed>> should be kept')).to.equal('This should be kept');
	});
});
