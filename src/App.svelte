<script lang="ts">
  import AddNote from "./lib/components/AddNote.svelte";
  import Header from "./lib/components/Header.svelte";
  import Logos from "./lib/components/Logos.svelte";
  import NoteComponent from "./lib/components/Note.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { notesList } from "./lib/stores/db";
  import type { Note } from "./lib/types";
  import UpdateModal from "./lib/components/UpdateModal.svelte";

  let noteToUpdate = {} as Note;
  const selectNoteToUpdate = (noteId: string) => (noteToUpdate = $notesList.get(noteId));
</script>

<main class="relative min-h-screen w-full bg-[#f0f0f0] px-[100px] py-[50px]">
  <!-- Header -->
  <Header />

  <!-- Technology Logos -->
  <Logos />

  <!-- Handles The Addition of notes -->
  <AddNote />

  <!-- Notes Wrapper -->
  <div class="relative mx-auto my-[50px] grid grid-cols-fill gap-5">
    {#each [...$notesList.values()] as note (note.id)}
      <!-- Added fade in transition and flip animation for the elements to slide in or out depending on scenario -->
      <div
        class="group relative break-words rounded-lg border border-solid border-[#dadce0] bg-white p-5 transition-all duration-[250ms] ease-in-out hover:[box-shadow:_0_1px_2px_0_rgba(60,_64,_67,_0.3),_0_2px_6px_2px_rgba(60,_64,_67,_0.15)]"
        in:fade
        animate:flip={{ duration: 500 }}
        on:click={() => selectNoteToUpdate(note.id)}
      >
        <NoteComponent {note} />
      </div>
    {/each}
  </div>

  {#if Object.entries(noteToUpdate).length > 0}
    <UpdateModal bind:noteToUpdate />
  {/if}
</main>

<style>
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
