<script lang="ts">
  import type { Note } from "../types";

  export let note: Note;
</script>

<!-- You need to click only on this Icon to edit -->
<svg
  class="absolute top-3 right-3 h-6 w-6 cursor-pointer opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  ><path fill="none" d="M0 0h24v24H0V0z" />
  <path
    d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
  />
</svg>

<div>
  {#if note.title.length > 0 || note.content.length > 0}
    <!-- note title -->
    <h1 class={note.title ? "mb-[0.67em] font-open text-lg" : ""}>
      {note.title}
    </h1>

    <!-- note content -->
    <p class="whitespace-pre-wrap leading-normal">
      <!-- Allows rendering of HTML Texts XD (prolly not advised due to possible XSS attacks :|) -->
      <!-- {@html note.content} -->
      {note.content}
    </p>
  {:else}
    <p class="text-2xl text-black/50">Empty Note</p>
  {/if}
</div>
