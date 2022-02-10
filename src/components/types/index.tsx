export type MainProps = {
  notebooks: NotebookType;
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

export type NoteType = {
  id: string;
  noteTitle: string;
  note: string;
  isDeleted: boolean;
  lastNotebook: string;
  lastNotebookTitle: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NotebookType = {
  [id: string]: {
    id: string;
    title: string;
    notes: Array<NoteType>;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type NotebooksType = {
  notebooks: NotebookType;
  notebookOrder: Array<string>;
};

export type UpdateNoteType = {
  noteTitle: string | undefined;
  note: string | undefined;
};

export type NoteProps = MainProps & {
  currentNoteId: string | undefined;
  open: boolean;
  formatDate: (date: Date) => JSX.Element;
  handleSnackbar: (message: string, severity: string) => void;
  updateNote: (
    notebookId: string,
    noteId: string | undefined,
    note: UpdateNoteType
  ) => void;
  deleteNote: (origin: string, noteId: string | undefined) => void;
};

export type SidebarProps = MainProps & {
  setNotebook: (notebook: string) => void;
  handleNotebookClick: (notebookId: string) => void;
  addNewNotebook: (_id: string, title: string) => void;
  removeNotebook: (notebook: string) => void;
  setView: (view: string) => void;
};

export type SidebarItemProps = MainProps & {
  thisNotebook: string;
  open: boolean;
  handleNotebookClick: (notebook: string) => void;
  removeNotebook: (id: string) => void;
};

export type NoteListProps = NoteProps & {
  note: NoteType;
  convertTitle: (title: string, length: number) => string;
};

export type NotebooksProps = {
  notebooks: NotebookType;
  notebookOrder: Array<string>;
  handleNotebookClick: (notebook: string) => void;
};
