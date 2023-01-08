<script lang="ts">
	import { onMount } from 'svelte';
	import type { FunctionPlotDatum } from 'function-plot/dist/types';

	export let width = 220;
	export let height = 220;
	export let target = 'root';
	export let domain = [-10, 10];
	export let grid = true;
	export let fn = 'x';
	export let fnType: FunctionPlotDatum['fnType'] = 'linear';

	onMount(async () => {
		const functionPlot = (await import('function-plot')).default;
		functionPlot({
			target: `#${target}`,
			width,
			height,
			disableZoom: true,
			yAxis: { domain },
			xAxis: { domain },
			grid,
			data: [
				{
					fn,
					fnType
				}
			]
		});
	});
</script>

<div id={target} class="p-2" />
