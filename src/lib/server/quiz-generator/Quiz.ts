import PointSlopeLinearProblem from './linear/PointSlopeLinearProblem';
import SlopeInterceptLinearProblem from './linear/SlopeInterceptLinearProblem';
import StandardLinearProblem from './linear/StandardLinearProblem';
import type { ProblemObject } from './Problem';
import type Problem from './Problem';
import FactoredQuadraticProblem from './quadratic/FactoredQuadraticProblem';
import StandardQuadraticProblem from './quadratic/StandardQuadraticProblem';
import VertexQuadraticProblem from './quadratic/VertexQuadraticProblem';
import RNG from './RNG';
import TrigonometricProblem from './trigonometric/TrigonometricProblem';

export interface QuizObject {
	problems: ProblemObject[];
}

export default class Quiz {
	public problemSet: Problem[] = [];
	public rng: RNG;

	protected static problemTypeMap: { [type: string]: Array<new (rng?: RNG) => Problem> } = {
		LINEAR: [StandardLinearProblem, PointSlopeLinearProblem, SlopeInterceptLinearProblem],
		QUADRATIC: [StandardQuadraticProblem, VertexQuadraticProblem, FactoredQuadraticProblem],
		TRIGONOMETRIC: [TrigonometricProblem]
	};

	constructor(seed = 'i_love_math', problemSetSize = 10, types: string[] = ['LINEAR']) {
		this.rng = new RNG({ min: 1, max: 5 }, seed);
		const sizePerType = Math.ceil((problemSetSize ?? 1) / types.length);
		types.forEach((type) => {
			for (let i = 0; i < sizePerType; i++) {
				this.problemSet.push(this.createProblem(type.toUpperCase()));
			}
		});
	}

	public createProblem(type: string): Problem {
		const problemConstructor = this.rng.chooseRandom(Quiz.problemTypeMap[type]);
		if (!problemConstructor) throw new Error(`Invalid problem type ${type}`);
		return new problemConstructor(this.rng);
	}

	public toJSON(): QuizObject {
		return {
			problems: this.problemSet.map((problem) => problem.toJSON())
		};
	}

	public static getSupportedTypes() {
		return Object.keys(Quiz.problemTypeMap);
	}
}
