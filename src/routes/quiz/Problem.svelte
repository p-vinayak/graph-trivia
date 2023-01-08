<script lang="ts">
	import type { ProblemObject } from '$lib/server/quiz-generator/Problem';
	import { convertNumberToLetter } from '$lib/utils';
	import katex from 'katex';
	import Graph from './Graph.svelte';

	export let problemNumber: number;
	export let totalProblemCount: number;
	export let problem: ProblemObject;
	export let timeLeftInSeconds: number;
	export let answerChosen = 0;
	export let submit: (answerSubmitted: number | null) => void;
</script>

<div class="flex h-screen">
	<div class="flex flex-col m-auto space-y-4">
		<div class="mx-auto text-center text-3xl bg-neutral p-4 rounded-lg shadow-lg">
			<p class="font-bold font-mono underline">
				Problem {problemNumber} of {totalProblemCount}
			</p>
			<p>
				{@html katex.renderToString(problem.prompt.sanitizedEquation)}
			</p>
		</div>
		<div class="flex space-x-4">
			{#each problem.options as option, i (`${problemNumber}-${i}`)}
				<div class="form-control bg-neutral rounded-lg shadow-lg p-5">
					<label class="label cursor-pointer flex flex-col space-y-2">
						<div class="bg-white rounded-md">
							<Graph fn={option.sanitizedPlottableEquation} target={`p${problemNumber}o${i}`} />
						</div>
						<span class="label-text text-2xl font-bold">{convertNumberToLetter(i)}</span>
						<input
							type="radio"
							id={`rp${problemNumber}o${i}`}
							name={`np${problemNumber}o${i}`}
							value={i}
							class="radio checked:bg-red-500"
							bind:group={answerChosen}
						/>
					</label>
				</div>
			{/each}
		</div>
		<span class="mx-auto font-mono text-3xl bg-neutral p-5 rounded-lg shadow-lg">
			<span>Time Left:</span>
			<span class="countdown">
				<span style="--value:{timeLeftInSeconds};" />
			</span>
			<span>seconds</span>
		</span>
		<button on:click={() => submit(answerChosen)} class="mx-auto btn btn-primary rounded-md"
			>Submit</button
		>
	</div>
</div>
