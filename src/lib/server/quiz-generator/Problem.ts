import type { FnObject } from './Fn';
import type Fn from './Fn';
import RNG from './RNG';

export interface ProblemObject {
	prompt: FnObject;
	options: FnObject[];
	correctAnswerIndex: number;
}

export default abstract class Problem {
	public rng: RNG;
	public prompt!: Fn;
	public options!: Fn[];
	public correctAnswerIndex!: number;

	constructor(rng?: RNG) {
		this.rng = rng ?? new RNG();
	}

	protected abstract generateOptions(): Fn[];

	protected generateCorrectAnswerAndSetPrompt(): void {
		this.correctAnswerIndex = this.rng.getRandomNumberBetween(0, this.options.length - 1);
		this.prompt = this.options[this.correctAnswerIndex];
	}

	public toJSON(): ProblemObject {
		return {
			prompt: this.prompt.toJSON(),
			options: this.options.map((option) => option.toJSON()),
			correctAnswerIndex: this.correctAnswerIndex
		};
	}
}
