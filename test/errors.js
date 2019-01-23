'use strict';

const Fs = require('fs');
const { expect } = require('code');
const Lab = require('lab');
const lab = (exports.lab = Lab.script());
const { ArgumentsError } = require('../src/errors');
const HapifySyntax = require('../src');
const { EvaluationError, TimeoutError } = require('../src/errors');

const Model = require('./models/video.json');
const Simple = Fs.readFileSync(`${__dirname}/masks/simple.hpf`, 'utf8');
const InputConditional = Fs.readFileSync(`${__dirname}/masks/error-conditional.hpf`, 'utf8');
const InputIteration = Fs.readFileSync(`${__dirname}/masks/error-iteration.hpf`, 'utf8');
const InputInterpolation = Fs.readFileSync(`${__dirname}/masks/error-interpolation.hpf`, 'utf8');
const InputTimeout = Fs.readFileSync(`${__dirname}/masks/error-timeout.hpf`, 'utf8');

lab.test('run', async () => {
	//Test input validity
	expect(Simple).to.be.a.string();
	expect(Model).to.be.an.object();

	expect(() => HapifySyntax.run()).to.throw(ArgumentsError);

	expect(() => HapifySyntax.run(Simple)).to.throw(ArgumentsError);

	expect(() => HapifySyntax.run(Simple, undefined)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(Simple, null)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(Simple, true)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(Simple, 3)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(Simple, 'string')).to.throw(ArgumentsError);

	expect(() => HapifySyntax.run(undefined, Model)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(null, Model)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(false, Model)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run(4, Model)).to.throw(ArgumentsError);
	expect(() => HapifySyntax.run({}, Model)).to.throw(ArgumentsError);

	expect(HapifySyntax.run(Simple, Model)).to.be.a.string();
});

lab.test('Check reverse lineColumn error for conditional', async () => {
	//Test input validity
	expect(InputConditional).to.be.a.string();
	expect(Model).to.be.an.object();

	try {
		HapifySyntax.run(InputConditional, Model);
		fail('This input needs to return an error');
	} catch (err) {
		expect(err).to.be.an.error(EvaluationError, 'rrgrfbfb is not defined');
        expect(err.code).to.be.a.number();
        expect(err.lineNumber).to.be.a.number();
        expect(err.columnNumber).to.be.a.number();
		expect(err.stack).to.be.equal('Error: rrgrfbfb is not defined. Line: 16, Column: 13');
	}
});

lab.test('Check reverse lineColumn error for iteration', async () => {
	//Test input validity
	expect(InputIteration).to.be.a.string();
	expect(Model).to.be.an.object();

	try {
		HapifySyntax.run(InputIteration, Model);
		fail('This input needs to return an error');
	} catch (err) {
		expect(err).to.be.an.error(EvaluationError, 'T is not defined');
        expect(err.code).to.be.a.number();
        expect(err.lineNumber).to.be.a.number();
        expect(err.columnNumber).to.be.a.number();
		expect(err.stack).to.be.equal('Error: T is not defined. Line: 10, Column: 1');
	}
});

lab.test('Check reverse lineColumn error for name interpolation', async () => {
    //Test input validity
    expect(InputInterpolation).to.be.a.string();
    expect(Model).to.be.an.object();

    try {
        HapifySyntax.run(InputInterpolation, Model);
        fail('This input needs to return an error');
    } catch (err) {
        expect(err).to.be.an.error(EvaluationError, 'g is not defined');
        expect(err.code).to.be.a.number();
        expect(err.lineNumber).to.be.a.number();
        expect(err.columnNumber).to.be.a.number();
        expect(err.stack).to.be.equal('Error: g is not defined. Line: 20, Column: 5');
    }
});

lab.test('Trigger a timeout', async () => {
    //Test input validity
    expect(InputTimeout).to.be.a.string();
    expect(Model).to.be.an.object();

    try {
        HapifySyntax.run(InputTimeout, Model);
        fail('This input needs to return an error');
    } catch (err) {
        expect(err).to.be.an.error(TimeoutError);
        expect(err.code).to.be.a.number();
    }
});
