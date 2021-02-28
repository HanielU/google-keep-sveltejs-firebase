<script>
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let dbItems;
	let empty,
		title = "",
		content = "";

	$: if (content.length < 1 && title.length < 1) {
		empty = "Empty Note";
	}

	// Dispatches data from individual Added note
	function modalData(args) {
		dispatch("edit", args);
	}
</script>

<style>
	.note {
		background: #fff;
		border: 1px solid #dadce0;
		padding: 20px;
		border-radius: 8px;
		overflow-wrap: break-word;
		transition: 250ms ease-in-out;
		position: relative;
	}

	.note svg {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 25px;
		height: 25px;
		opacity: 0;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}

	.note:hover {
		box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 2px 6px 2px rgba(60, 64, 67, 0.15);
	}

	.note:hover svg {
		opacity: 1;
		cursor: pointer;
	}

	.note-title {
		font-size: 18px;
		margin-bottom: 0.67em;
		font-family: "Open Sans";
	}

	.note-content {
		white-space: pre-wrap;
		line-height: 1.5;
	}

	.empty {
		color: rgba(0, 0, 0, 0.5);
		font-size: 24px;
	}
</style>

{#each dbItems as doc (doc.id)}
	<div
		class="note {doc.id}"
		in:fade
		animate:flip={{ duration: 500 }}
		on:click={modalData({ item: [doc.data(), doc.id, { showModal: true }] })}>
		<!-- Added fade in transition and flip animation for the elements to slide in or out depending on scenario -->

		<!-- You need to click only on this Icon to edit -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" />
			<path
				d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
		</svg>

		<div>
			{#if doc.data().title.length > 0 || doc.data().content.length > 0}
				<h1 class={doc.data().title ? 'note-title' : ''}>
					{(title = doc.data().title)}
				</h1>
				<p class="note-content">
					<!-- Allows rendering of HTML Texts XD (prolly not advised due to possible XSS attacks :|) -->
					<!-- {@html (content = doc.data().content)} -->
					{(content = doc.data().content)}
				</p>
			{:else}
				<p class="empty">{empty}</p>
			{/if}
		</div>
	</div>
{/each}
