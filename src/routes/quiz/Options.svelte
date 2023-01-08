<script lang="ts">
	export let problemTypes: string[];
	let seed = 'i_love_math';
	let problemSetSize = 10;
	let problemTypesChosen = [problemTypes[0]];
</script>

<input type="checkbox" id="my-modal" class="modal-toggle" checked />
<div class="modal">
	<div class="modal-box w-96 bg-base-100">
		<h3 class="font-bold text-lg text-center">Quiz Generation Options</h3>
		<form class="space-y-4" method="POST">
			<div class="form-control w-full max-w-xs">
				<label class="label" for="seed">
					<span class="label-text">Seed</span>
				</label>
				<input
					id="seed"
					type="text"
					placeholder="Enter Seed"
					class="input input-bordered w-full max-w-xs"
					name="seed"
					bind:value={seed}
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="difficulty" class="label">
					<span class="label-text">Difficulty</span>
				</label>
				<select
					name="problemSetSize"
					id="difficulty"
					class="select select-bordered"
					bind:value={problemSetSize}
				>
					<option value={5}>Easy</option>
					<option value={10}>Normal</option>
					<option value={20}>Hard</option>
				</select>
			</div>
			<div class="form-control">
				<label class="label" for="problem-types">
					<span class="label-text">Problem Types</span>
				</label>
				<div id="problem-types">
					{#each problemTypes as problemType}
						<label class="label cursor-pointer">
							<span class="label-text font-bold">{problemType}</span>
							<input
								type="checkbox"
								name="problemTypes"
								class="checkbox checkbox-primary"
								bind:group={problemTypesChosen}
								value={problemType}
							/>
						</label>
					{/each}
				</div>
			</div>
			<div class="modal-action justify-center">
				<label for="my-modal">
					<button type="submit" class="btn btn-primary">Generate</button>
				</label>
			</div>
		</form>
	</div>
</div>
