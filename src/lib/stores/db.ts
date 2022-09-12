import type { CollectionReference, Firestore, Unsubscribe } from "firebase/firestore";
import { writable } from "svelte/store";
import type { Note } from "../types";

export const notesList = createDBStore();

function createDBStore() {
  let db: Firestore;
  let testCollectionRef: CollectionReference;

  const { subscribe } = writable<Map<string, Note>>(new Map(), set => {
    let unsubscribe: Unsubscribe;

    // init function (lazy-loading)
    (async () => {
      const { getFirestore, onSnapshot, collection, orderBy, query } = await import(
        "firebase/firestore"
      );
      const { app } = await import("../firebase");

      db = getFirestore(app);

      testCollectionRef = collection(db, "test");
      const orderedCollection = query(testCollectionRef, orderBy("pos", "desc"));

      unsubscribe = onSnapshot(orderedCollection, snapshot => {
        const noteItems = new Map();
        snapshot.docs.forEach(v => noteItems.set(v.id, { ...v.data(), id: v.id }));
        set(noteItems);
      });
    })();

    return () => unsubscribe();
  });

  const addNote = async (data: Omit<Note, "id">) => {
    if (!testCollectionRef) return false;
    const { addDoc } = await import("firebase/firestore");
    await addDoc(testCollectionRef, data);
    return true;
  };

  const updateNote = async (id: string, updatedNote: Omit<Note, "id">) => {
    if (!testCollectionRef) return false;
    const { updateDoc, doc } = await import("firebase/firestore");
    const noteRef = doc(testCollectionRef, id);
    await updateDoc(noteRef, updatedNote);
    return true;
  };

  const deleteNote = async (id: string) => {
    if (!testCollectionRef) return false;
    const { deleteDoc, doc } = await import("firebase/firestore");
    const noteRef = doc(testCollectionRef, id);
    await deleteDoc(noteRef);
    return true;
  };

  return {
    subscribe,
    addNote,
    updateNote,
    deleteNote
  };
}
