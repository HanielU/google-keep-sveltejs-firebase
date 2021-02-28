<style>
	.logos {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto 30px;
	}

	.logo {
		width: 50px;
	}

	.logo img {
		max-width: 100%;
		vertical-align: middle;
	}

	.svelte {
		width: 40px;
	}

	.firebase {
		width: 30px;
		margin: 0 8px;
	}

	.plus {
		margin: 0 10px;
		font-weight: 400;
	}
</style>

<div class="logos">
	<span class="logo keep">
		<img src="imgs/keep-logo.png" alt="Google Keep" />
	</span>
	<span class="plus">+</span>
	<span class="logo svelte">
		<img src="imgs/svelte-logo.png" alt="Svelte" />
	</span>
	<span class="plus">+</span>
	<span class="logo firebase">
		<img src="imgs/firebase-logo.png" alt="Firebase" />
	</span>
</div>
