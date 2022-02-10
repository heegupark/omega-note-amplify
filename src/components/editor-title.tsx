import { FiBook } from 'react-icons/fi';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NoteProps, NoteType } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '40px',
    },
    style: {
      color: 'rgb(136,141,144)',
      margin: '5px 10px',
      padding: '3px 6px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    icon: {
      marginRight: '5px',
      verticalAlign: 'middle',
    },
    title: {
      verticalAlign: 'middle',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgb(235,235,235)',
        borderRadius: '5px',
      },
    },
    date: {
      fontSize: '12px',
      top: '10px',
      right: '20px',
    },
  })
);

export default function EditorTitle({ notebooks, notebook, currentNoteId, formatDate }: NoteProps) {
  const classes = useStyles();
  let updateAt = new Date();
  notebooks[notebook].notes.forEach((note: NoteType) => {
    if (note.id === currentNoteId) {
      updateAt = note.updatedAt;
    }
  });
  return (
    <div className={classes.root}>
      <span className={classes.style}>
        <div>
          <FiBook className={classes.icon} />
          <span className={classes.title}>
            {notebooks[notebook].title}
          </span>
        </div>
        {currentNoteId && (
          <span className={classes.date}>
            {'Last edited on '}
            {formatDate(updateAt)}
          </span>
        )}
      </span>
    </div>
  );
}
