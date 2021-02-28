<script>
	import { database } from "../firebase";

	let db = database.collection("test");
	let inputVisible = false;
	let title = "";
	let content = "";

	// Adds created note to database
	function handleAdd() {
		if (title == "" && content == "") {
			return;
		}

		let date = new Date();

		let data = {
			title,
			content,
			pos: date.getTime(),
		};

		db.add(data);
		title = "";
		content = "";
		inputVisible = false;
	}

	function resizeTextArea() {
		this.style.height = "auto";
		this.style.height = `${this.scrollHeight}px`;
	}

	function showTitle() {
		inputVisible = true;
	}

	function hideTitle() {
		inputVisible = false;
	}

	// One way to Remove input field on click of the body
	// (But It doesn't give me the same effect of that of Brittany Chiang so I removed it XD)
	/* document.addEventListener("click", (e) => {
		let inputField = e.target.tagName.toLowerCase();
		console.log(inputField);
		if (
			inputField !== "textarea" &&
			inputField !== "input" &&
			inputField !== "form"
		) {
			hideTitle();
		}
	}); */
</script>

<style>
	.create-note {
		box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 2px 6px 2px rgba(60, 64, 67, 0.15);
		position: relative;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		background-color: #fff;
		border-radius: 8px;
		z-index: 10;
	}

	input,
	textarea {
		width: 100%;
		display: block;
		border: 0;
		outline: 0;
		margin: 0;
		padding: 0;
		font-size: 16px;
		background-color: transparent;
		font-family: "Open Sans";
	}

	textarea::placeholder {
		font-weight: 600;
	}

	input::placeholder,
	textarea::placeholder {
		opacity: 0.9;
	}

	input {
		font-weight: 600;
		font-size: 18px;
		margin-bottom: 10px;
	}

	textarea {
		resize: none;
		line-height: 1.5;
		min-height: 5em;
		max-height: 50vh;
		width: 100%;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 18px;
		bottom: -18px;
		background: #ff4003;
		color: #fff;
		border: none;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		cursor: pointer;
		font-size: 24px;
		line-height: 1;
		text-align: center;
		box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 2px 6px 2px rgba(60, 64, 67, 0.15);
	}

	.not-visible {
		display: none;
	}

	.backdrop {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
</style>

<div class="create-form">
	<div
		class="backdrop"
		class:not-visible={!inputVisible}
		on:click={hideTitle} />

	<form class="create-note" on:submit|preventDefault={handleAdd}>
		<input
			class="title"
			type="text"
			placeholder="Title"
			name="title"
			bind:value={title}
			on:focus={showTitle}
			class:not-visible={!inputVisible} />

		<textarea
			placeholder="Take a note..."
			bind:value={content}
			name="content"
			on:input={resizeTextArea}
			on:focus={showTitle} />

		<button>+</button>
	</form>
</div>
