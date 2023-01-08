import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class VertexQuadraticProblem extends Problem {
	public a: number;
	public h: number;
	public k: number;

	constructor(rng?: RNG) {
		super(rng);
		this.a = this.rng.getRandomNumber();
		this.h = this.rng.getRandomNumber();
		this.k = this.rng.getRandomNumber();
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(`y = ${this.a}(x - ${this.h})^2 + ${this.k}`),
			new Fn(`y = ${this.a * -1}(x - ${this.h})^2 + ${this.k}`),
			new Fn(`y = ${this.a}(x - ${this.h * -1})^2 + ${this.k}`),
			new Fn(`y = ${this.a}(x - ${this.h * -1})^2 + ${this.k * -1}`)
		];
	}
}
