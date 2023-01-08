import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class FactoredQuadraticProblem extends Problem {
	public a: number;
	public p: number;
	public q: number;

	constructor(rng?: RNG) {
		super(rng);
		this.a = this.rng.getRandomNumber();
		this.p = this.rng.getRandomNumber();
		this.q = this.rng.getRandomNumber();
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(`y = ${this.a}(x + ${this.p})(x + ${this.q})`),
			new Fn(`y = ${this.a * -1}(x + ${this.p})(x + ${this.q})`),
			new Fn(`y = ${this.a}(x + ${this.p * -1})(x + ${this.q * -1})`),
			new Fn(`y = ${this.a * -1}(x + ${this.p * -1})(x + ${this.q * -1})`)
		];
	}
}
