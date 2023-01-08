import seedrandom from 'seedrandom';

export interface RandomRange {
	min: number;
	max: number;
}

export default class RNG {
	protected randomRange: RandomRange;
	protected seed: string;
	protected generator: seedrandom.PRNG;

	constructor(randomRange: RandomRange = { min: 1, max: 5 }, seed = 'a_random_seed') {
		this.randomRange = randomRange;
		this.seed = seed;
		this.generator = seedrandom(seed);
	}

	public getRandomNumber() {
		return Math.floor(
			this.generator() * (this.randomRange.max - this.randomRange.min + 1) + this.randomRange.min
		);
	}

	public getRandomNumberBetween(min = 0, max = 5) {
		return Math.floor(this.generator() * (max - min + 1) + min);
	}

	public chooseRandom<T>(array: Array<T>) {
		const chosenIndex = this.getRandomNumberBetween(0, array.length - 1);
		return array[chosenIndex];
	}
}
