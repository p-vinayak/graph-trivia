<script lang="ts">
	import { convertNumberToLetter } from '$lib/utils';
	import katex from 'katex';
	import { round } from 'lodash-es';
	import type { ProblemReport, QuizReport } from './Quiz.svelte';

	export let scores: { [problemIndex: number]: ProblemReport };
	export let report: QuizReport;
</script>

<div class="flex h-screen">
	<div class="flex flex-col space-y-3 m-auto bg-neutral rounded-lg p-8 w-2/3">
		<h1 class="text-2xl font-bold mx-auto underline">Quiz Report</h1>
		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead class="text-center">
					<tr>
						<th>Problem Number</th>
						<th>Prompt</th>
						<th>Time Taken</th>
						<th>Your Answer</th>
						<th>Correct Answer</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(scores) as [problemIndex, score]}
						<tr class="text-center">
							<th>{parseInt(problemIndex) + 1}</th>
							<td>{@html katex.renderToString(score.problemPrompt)}</td>
							<td>{score.timeTakenInSeconds} seconds</td>
							<td
								>{score.givenAnswer != null
									? convertNumberToLetter(score.givenAnswer)
									: 'No Response'}</td
							>
							<td>{convertNumberToLetter(score.correctAnswer)}</td>
							<td>{round(score.scoreObtained, 4)}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="text-center">
						<th>Problem Number</th>
						<th>Prompt</th>
						<th>Time Taken</th>
						<th>Your Answer</th>
						<th>Correct Answer</th>
						<th>Score</th>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="stat text-center">
			<div class="stat-figure text-secondary" />
			<div class="stat-title">Final Score</div>
			<div class="stat-value text-secondary">{round(report.percentageScore, 4)}%</div>
			<div class="stat-desc">
				{round(report.scoreObtained, 4)} out of {round(report.maximumPossibleScore, 4)}
			</div>
		</div>
	</div>
</div>
