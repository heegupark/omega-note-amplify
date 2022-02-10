export default interface INote {
  id: string;
  noteTitle: string;
  note: string;
  isDeleted: boolean;
  lastNotebook: string;
  lastNotebookTitle: string;
  createdAt: Date;
  updatedAt: Date;
}
