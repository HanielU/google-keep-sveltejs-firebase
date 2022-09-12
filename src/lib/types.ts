export type Note = {
  content: string;
  title: string;
  pos: number;

  /** Gotten from firestore */
  id: string;
};
