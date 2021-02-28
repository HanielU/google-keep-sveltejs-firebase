<script>
	import { database } from "./firebase";
	import Header from "./components/Header.svelte";
	import Logos from "./components/Logos.svelte";
	import CreateNote from "./components/CreateNote.svelte";
	import Notes from "./components/Notes.svelte";
	import Note from "./components/Note.svelte";
	import UpdateModal from "./components/Modal.svelte";

	// Initialising database for realtime update
	let db = database.collection("test");

	// List of database Items
	let dbItems = [];

	// Initialise variable for storing data from individual note items
	let notedata;

	// Gets data from database and appends to database items (dbItems)
	function getData(snapshot) {
		dbItems = snapshot.docs;
	}

	// It all starts here
	db.orderBy("pos", "desc").onSnapshot((snapshot) => getData(snapshot));

	// Transfer dispatched data from the Note Component to notedata object
	function handleData(e) {
		let details = e.detail,
			data = details.item;

		// Note data dispatched from individual Note component
		notedata = data;

		// Logs out current note data
		console.log("Note data: ", notedata);
	}
</script>

<!-- Styles -->
<style>
	main {
		width: 100%;
		min-height: 100vh;
		background: #f0f0f0;
		padding: 50px 100px;
		position: relative;
	}

	@media screen and (max-width: 850px) {
		main {
			padding: 100px 50px 50px;
		}
	}

	@media screen and (max-width: 480px) {
		main {
			padding: 100px 30px 30px;
		}
	}

	@media screen and (max-width: 330px) {
		main {
			padding: 100px 20px 20px;
		}
	}
</style>

<main>
	<!-- Header -->
	<Header />

	<!-- Technology Logos -->
	<Logos />

	<!-- Handles The creation of notes -->
	<CreateNote />

	<!-- Handles adding notes -->
	<Notes>
		<Note {dbItems} on:edit={handleData} />
	</Notes>

	<!-- Handles the Modal For updating note content -->
	<UpdateModal {notedata} />
</main>
