<script lang="ts">
  import { scale } from "svelte/transition";
  import { notesList } from "../stores/db";
  import type { Note } from "../types";

  export let noteToUpdate = {} as Note;
  let { title, content, id, pos } = noteToUpdate;

  // Add removes item from database AND UI in realtime
  const handleDelete = async () => {
    if (!confirm("Do you really want to delete this note?")) return;

    await notesList.deleteNote(id);
    hideModal();
  };

  const handleUpdate = async () => {
    await notesList.updateNote(id, { title, content, pos });
    hideModal();
  };

  const hideModal = () => {
    noteToUpdate = {} as Note;
    document.body.classList.remove("freeze");
  };

  // Prevents scrolling when modal is open (.freeze{overflow: hidden;})
  if (noteToUpdate) {
    document.body.classList.add("freeze");
  }

  function resizeTextArea() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
</script>

<div class="backdrop" on:click|self={hideModal}>
  <div class="modal" transition:scale={{ duration: 250 }} on:click|self={hideModal}>
    <form class="edit-form">
      <input type="text" class="modal-title" placeholder="Title" name="title" bind:value={title} />

      <textarea
        placeholder="Take a note..."
        name="content"
        rows="8"
        class="modal-content"
        bind:value={content}
        on:input={resizeTextArea}
      />

      <footer class="modal-footer">
        <button class="delete" on:click|preventDefault={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            ><path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>

        <button class="done" on:click|preventDefault={handleUpdate}><span>Done</span> </button>
      </footer>
    </form>
  </div>
</div>

<style>
  .modal,
  .backdrop {
    display: flex;
    align-items: center;
  }

  .backdrop {
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(0, 0%, 89.8%, 0.75);
    z-index: 100;
  }

  .modal {
    justify-content: center;
    width: 100%;
    margin: 25px;
    padding-top: 20vh;
  }

  .edit-form {
    position: relative;
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 20px 20px 8px;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
    transition: all 0.2s ease-in-out;
  }

  .modal-title {
    margin-bottom: 20px;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .delete {
    width: 35px;
    padding: 8px;
    margin-left: -8px;
    opacity: 0.5;
  }

  .delete svg {
    width: 100%;
    height: 100%;
  }

  .done {
    height: 36px;
    padding: 8px 24px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 14px;
  }
</style>
