import INote from './inote';

export default interface INotebook {
  [id: string]: {
    id: string;
    title: string;
    notes: Array<INote>;
    createdAt: Date;
    updatedAt: Date;
  };
}
