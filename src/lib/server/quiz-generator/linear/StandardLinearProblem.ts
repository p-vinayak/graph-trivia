import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class StandardLinearProblem extends Problem {
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
			new Fn(`${this.a}x + ${this.b}y = ${this.c}`, `y = (${this.c} - ${this.a}x)/${this.b}`),
			new Fn(
				`${this.a * -1}x + ${this.b}y = ${this.c}`,
				`y = (${this.c} - ${this.a * -1}x)/${this.b}`
			),
			new Fn(
				`${this.a}x + ${this.b * -1}y = ${this.c}`,
				`y = (${this.c} - ${this.a}x)/${this.b * -1}`
			),
			new Fn(
				`${this.a * -1}x + ${this.b * -1}y = ${this.c}`,
				`y = (${this.c} - ${this.a}x)/${this.b}`
			)
		];
	}
}
