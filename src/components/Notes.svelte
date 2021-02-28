<style>
	.notes {
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
		position: relative;
		margin: 50px auto;
	}
</style>

<div class="notes" on:click>
	<slot />
</div>
