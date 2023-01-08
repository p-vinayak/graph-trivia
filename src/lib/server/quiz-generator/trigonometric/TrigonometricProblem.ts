import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export type TrigonometricFunctionType = 'COS' | 'SIN' | 'TAN' | 'COT' | 'SEC' | 'CSC';

export default class TrigonometricProblem extends Problem {
	public a: number;
	public b: number;
	public c: number;
	public d: number;
	public fnType: TrigonometricFunctionType;

	constructor(rng?: RNG, fnType: TrigonometricFunctionType = 'SIN') {
		super(rng);
		this.a = this.rng.getRandomNumber();
		this.b = this.rng.getRandomNumber();
		this.c = this.rng.getRandomNumber();
		this.d = this.rng.getRandomNumber();
		this.fnType = fnType;
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(`y = ${this.a} * ${this.fnType.toLowerCase()}(${this.b}x + ${this.c}) + ${this.d}`),
			new Fn(
				`y = ${this.a * -1} * ${this.fnType.toLowerCase()}(${this.b}x + ${this.c}) + ${this.d}`
			),
			new Fn(
				`y = ${this.a} * ${this.fnType.toLowerCase()}(${this.b}x + ${this.c * -1}) + ${this.d}`
			),
			new Fn(
				`y = ${this.a} * ${this.fnType.toLowerCase()}(${this.b}x + ${this.c}/${this.b}) + ${this.d}`
			)
		];
	}
}
