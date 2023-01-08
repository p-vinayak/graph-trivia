import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class StandardQuadraticProblem extends Problem {
	public a: number;
	public b: number;
	public c: number;

	constructor(rng?: RNG) {
		super(rng);
		this.a = this.rng.getRandomNumber();
		this.b = this.rng.getRandomNumber();
		this.c = this.rng.getRandomNumber();
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(`y = ${this.a}x^2 + ${this.b}x + ${this.c}`),
			new Fn(`y = ${this.a * -1}x^2 + ${this.b}x + ${this.c}`),
			new Fn(`y = ${this.a}x^2 + ${this.b * -1}x + ${this.c}`),
			new Fn(`y = ${this.a}x^2 + ${this.b}x + ${this.c * -1}`)
			// new Fn(`y = ${this.a * -1}x^2 + ${this.b * -1}x + ${this.c * -1}`)
		];
	}
}
