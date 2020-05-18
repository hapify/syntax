'use strict';

import * as Fs from 'fs';
import { expect, fail } from '@hapi/code';
import 'mocha';
import { HapifySyntax } from '../src';
import { EvaluationError, TimeoutError, ArgumentsError } from '../src/errors';

const Model = require('./models/video.json');
const Simple = Fs.readFileSync(`${__dirname}/masks/simple.hpf`, 'utf8');
const InputConditional = Fs.readFileSync(`${__dirname}/masks/error-conditional.hpf`, 'utf8');
const InputIteration = Fs.readFileSync(`${__dirname}/masks/error-iteration.hpf`, 'utf8');
const InputInterpolation = Fs.readFileSync(`${__dirname}/masks/error-interpolation.hpf`, 'utf8');
const InputTimeout = Fs.readFileSync(`${__dirname}/masks/error-timeout.hpf`, 'utf8');
const InputRequire = Fs.readFileSync(`${__dirname}/masks/error-require.hpf`, 'utf8');
const InputImport = Fs.readFileSync(`${__dirname}/masks/error-import.hpf`, 'utf8');
const InputGlobal = Fs.readFileSync(`${__dirname}/masks/error-global.hpf`, 'utf8');

describe('errors', () => {
	it('run', async () => {
		//Test input validity
		expect(Simple).to.be.a.string();
		expect(Model).to.be.an.object();

		expect(() => HapifySyntax.run(undefined as any, undefined as any)).to.throw(ArgumentsError);

		expect(() => HapifySyntax.run(Simple, undefined as any)).to.throw(ArgumentsError);

		expect(() => HapifySyntax.run(Simple, undefined as any)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(Simple, null as any)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(Simple, true as any)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(Simple, 3 as any)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(Simple, 'string' as any)).to.throw(ArgumentsError);

		expect(() => HapifySyntax.run(undefined as any, Model)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(null as any, Model)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(false as any, Model)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run(4 as any, Model)).to.throw(ArgumentsError);
		expect(() => HapifySyntax.run({} as any, Model)).to.throw(ArgumentsError);

		expect(HapifySyntax.run(Simple, Model)).to.be.a.string();
	});

	it('Check reverse lineColumn error for conditional', async () => {
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
			expect(err.details).to.be.equal('Error: rrgrfbfb is not defined. Line: 16, Column: 13');
		}
	});

	it('Check reverse lineColumn error for iteration', async () => {
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
			expect(err.details).to.be.equal('Error: T is not defined. Line: 10, Column: 1');
		}
	});

	it('Check reverse lineColumn error for name interpolation', async () => {
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
			expect(err.details).to.be.equal('Error: g is not defined. Line: 20, Column: 5');
		}
	});

	it('Trigger a timeout', async () => {
		//Test input validity
		expect(InputTimeout).to.be.a.string();
		expect(Model).to.be.an.object();

		const start1 = Date.now();
		try {
			HapifySyntax.run(InputTimeout, Model);
			fail('This input needs to return an error');
		} catch (err) {
			expect(err).to.be.an.error(TimeoutError);
			expect(err.code).to.be.a.number();
			expect(Date.now() - start1).to.be.within(1000, 1020);
		}

		const start2 = Date.now();
		try {
			HapifySyntax.run(InputTimeout, Model, { timeout: 300 });
			fail('This input needs to return an error');
		} catch (err) {
			expect(err).to.be.an.error(TimeoutError);
			expect(err.code).to.be.a.number();
			expect(Date.now() - start2).to.be.within(300, 320);
		}
	}).slow(4000);

	it('Cannot use require', async () => {
		//Test input validity
		expect(InputRequire).to.be.a.string();
		expect(Model).to.be.an.object();

		try {
			HapifySyntax.run(InputRequire, Model);
			fail('This input needs to return an error');
		} catch (err) {
			expect(err).to.be.an.error(EvaluationError, 'require is not defined');
			expect(err.code).to.be.a.number();
			expect(err.lineNumber).to.be.a.number();
			expect(err.columnNumber).to.be.a.number();
			expect(err.details).to.be.equal('Error: require is not defined. Line: 5, Column: 1');
		}
	});

	it('Cannot use import', async () => {
		//Test input validity
		expect(InputImport).to.be.a.string();
		expect(Model).to.be.an.object();

		try {
			HapifySyntax.run(InputImport, Model);
			fail('This input needs to return an error');
		} catch (err) {
			expect(err).to.be.an.error(EvaluationError, 'Cannot use import statement outside a module');
			expect(err.details).to.be.equal('Error: Cannot use import statement outside a module. Line: null, Column: null');
		}
	});

	it('Cannot use global objects', async () => {
		//Test input validity
		expect(InputGlobal).to.be.a.string();
		expect(Model).to.be.an.object();
		expect(HapifySyntax.run(InputGlobal, Model)).to.be.a.string();
	});
});