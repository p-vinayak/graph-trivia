<script lang="ts">
	import Quiz from './Quiz.svelte';
	import type { ActionData, PageData } from './$types';
	import Options from './Options.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

{#if !form}
	<Options problemTypes={data.supportedTypes} />
{:else}
	<Quiz problems={form.quiz.problems} />
{/if}
