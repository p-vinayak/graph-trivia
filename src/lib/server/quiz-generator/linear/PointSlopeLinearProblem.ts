import Fn from '../Fn';
import Problem from '../Problem';
import type RNG from '../RNG';

export default class PointSlopeLinearProblem extends Problem {
	public m: number;
	public x1: number;
	public y1: number;

	constructor(rng?: RNG) {
		super(rng);
		this.m = this.rng.getRandomNumber();
		this.x1 = this.rng.getRandomNumber();
		this.y1 = this.rng.getRandomNumber();
		this.options = this.generateOptions();
		this.generateCorrectAnswerAndSetPrompt();
	}

	protected generateOptions(): Fn[] {
		return [
			new Fn(
				`y - ${this.y1} = ${this.m * -1}(x - ${this.x1})`,
				`y = ${this.m * -1}(x - ${this.x1}) + ${this.y1}`
			),
			new Fn(
				`y - ${this.y1 * -1} = ${this.m}(x - ${this.x1})`,
				`y = ${this.m}(x - ${this.x1}) + ${this.y1 * -1}`
			),
			new Fn(
				`y - ${this.y1} = ${this.m}(x - ${this.x1 * -1})`,
				`y = ${this.m}(x - ${this.x1 * -1}) + ${this.y1}`
			),
			new Fn(
				`y - ${this.y1 * -1} = ${this.m}(x - ${this.x1 * -1})`,
				`y = ${this.m}(x - ${this.x1 * -1}) + ${this.y1 * -1}`
			)
		];
	}
}
