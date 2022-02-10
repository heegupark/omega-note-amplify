import INotebook from './inotebook';

export default interface IMainProps {
  notebooks: INotebook;
  notebook: string;
  notebookOrder: Array<string>;
  setCurrentNoteId: (currentNoteId: string) => void;
  addNewNote: (title: string, note: string) => void;
  moveNote: (
    origin: string,
    destination: string,
    noteId: string | undefined
  ) => void;
}
