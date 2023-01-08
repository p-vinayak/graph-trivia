<script lang="ts" context="module">
	export interface ProblemReport {
		givenAnswer: number | null;
		correctAnswer: number;
		timeTakenInSeconds: number;
		maximumPossibleScore: number;
		scoreObtained: number;
		percentageScore: number;
		problemPrompt: string;
	}

	export interface QuizReport {
		scoreObtained: number;
		maximumPossibleScore: number;
		percentageScore: number;
		totalQuizTimeInSeconds: number;
		totalTimeTakenInSeconds: number;
	}
</script>

<script lang="ts">
	import type { ProblemObject } from '$lib/server/quiz-generator/Problem';
	import Report from './Report.svelte';
	import Problem from './Problem.svelte';

	export let problems: ProblemObject[];

	const DEFAULT_TIMER_IN_SECONDS = 60;
	const MAX_POSSIBLE_SCORE_PER_PROBLEM = DEFAULT_TIMER_IN_SECONDS / DEFAULT_TIMER_IN_SECONDS;

	let currentProblemIndex = 0;
	let timeLeftInSeconds = DEFAULT_TIMER_IN_SECONDS - 1;
	let isQuizActive = true;
	let problemReports: { [problemIndex: number]: ProblemReport } = {};
	let quizReport: QuizReport = {
		scoreObtained: 0,
		percentageScore: 0,
		totalTimeTakenInSeconds: -1,
		maximumPossibleScore: MAX_POSSIBLE_SCORE_PER_PROBLEM * problems.length,
		totalQuizTimeInSeconds: DEFAULT_TIMER_IN_SECONDS * problems.length
	};
	let interval = setInterval(() => {
		timeLeftInSeconds--;
		if (timeLeftInSeconds <= 0) handleAnswerSubmit(null);
	}, 1000);

	$: currentProblem = problems[currentProblemIndex];

	function handleAnswerSubmit(answerChosen: number | null) {
		problemReports[currentProblemIndex] = generateProblemReport(answerChosen);
		updateQuizReport(
			problemReports[currentProblemIndex].scoreObtained,
			problemReports[currentProblemIndex].timeTakenInSeconds
		);
		if (!isEndOfQuiz()) {
			nextProblem();
			resetInterval();
		} else {
			clearInterval(interval);
			endQuiz();
			finishQuizReport();
		}
	}

	function generateProblemReport(answerChosen: number | null): ProblemReport {
		let scoreObtained =
			answerChosen === currentProblem.correctAnswerIndex
				? MAX_POSSIBLE_SCORE_PER_PROBLEM * 0.9 +
				  MAX_POSSIBLE_SCORE_PER_PROBLEM * 0.1 * (timeLeftInSeconds / DEFAULT_TIMER_IN_SECONDS)
				: 0;
		let problemReport: ProblemReport = {
			givenAnswer: answerChosen,
			correctAnswer: currentProblem.correctAnswerIndex,
			timeTakenInSeconds: DEFAULT_TIMER_IN_SECONDS - timeLeftInSeconds,
			maximumPossibleScore: MAX_POSSIBLE_SCORE_PER_PROBLEM,
			scoreObtained,
			percentageScore: (scoreObtained / MAX_POSSIBLE_SCORE_PER_PROBLEM) * 100,
			problemPrompt: currentProblem.prompt.sanitizedEquation
		};
		return problemReport;
	}

	function updateQuizReport(score: number, timeTakenInSeconds: number) {
		quizReport.scoreObtained += score;
		quizReport.totalTimeTakenInSeconds += timeTakenInSeconds;
	}

	function finishQuizReport() {
		quizReport.percentageScore = (quizReport.scoreObtained / quizReport.maximumPossibleScore) * 100;
	}

	function nextProblem() {
		currentProblemIndex += 1;
	}

	function isEndOfQuiz() {
		return currentProblemIndex === problems.length - 1;
	}

	function resetInterval() {
		timeLeftInSeconds = DEFAULT_TIMER_IN_SECONDS;
	}

	function endQuiz() {
		isQuizActive = false;
	}
</script>

{#if isQuizActive}
	<Problem
		problemNumber={currentProblemIndex + 1}
		totalProblemCount={problems.length}
		problem={currentProblem}
		{timeLeftInSeconds}
		submit={handleAnswerSubmit}
	/>
{:else}
	<Report scores={problemReports} report={quizReport} />
{/if}
