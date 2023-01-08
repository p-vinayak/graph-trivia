import Quiz from '$lib/server/quiz-generator/Quiz';
import type { Actions } from '@sveltejs/kit';

export function load() {
	return {
		supportedTypes: Quiz.getSupportedTypes()
	};
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const seed = data.get('seed') as string;
		const problemSetSize = data.get('problemSetSize') as string;
		const problemTypesChosen = data.getAll('problemTypes') as string[];
		const quiz = new Quiz(seed, parseInt(problemSetSize), problemTypesChosen);
		return {
			quiz: quiz.toJSON(),
			supportedTypes: Quiz.getSupportedTypes()
		};
	}
};
