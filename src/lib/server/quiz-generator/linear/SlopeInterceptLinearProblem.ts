import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class SlopeInterceptLinearProblem extends Problem {
	public m: number;
	public b: number;

	constructor(rng?: RNG) {
		super(rng);
		this.m = this.rng.getRandomNumber();
		this.b = this.rng.getRandomNumber();
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(`y = ${this.m}x + ${this.b}`),
			new Fn(`y = ${this.m}x + ${this.b * -1}`),
			new Fn(`y = ${this.m * -1}x + ${this.b}`),
			new Fn(`y = ${this.m * -1}x - ${this.b * -1}`)
		];
	}
}
