import { sanitizeEquation } from './Sanitizer';

export interface FnObject {
	rawEquation: string;
	sanitizedEquation: string;
	rawPlottableEquation: string;
	sanitizedPlottableEquation: string;
}

export default class Fn {
	public rawEquation: string;
	public sanitizedEquation: string;
	public rawPlottableEquation: string;
	public sanitizedPlottableEquation: string;

	constructor(equation: string, plottableEquation?: string) {
		this.rawEquation = equation;
		this.sanitizedEquation = sanitizeEquation(this.rawEquation);
		this.rawPlottableEquation = plottableEquation ?? this.rawEquation;
		this.sanitizedPlottableEquation = sanitizeEquation(this.rawPlottableEquation);
	}

	public toJSON(): FnObject {
		return {
			rawEquation: this.rawEquation,
			sanitizedEquation: this.sanitizedEquation,
			rawPlottableEquation: this.rawPlottableEquation,
			sanitizedPlottableEquation: this.sanitizedPlottableEquation
		};
	}
}
