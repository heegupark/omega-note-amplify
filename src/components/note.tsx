import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NoteList from './note-list';
import EditorTitle from './editor-title';
import Editor from './editor';
import { CgNotes } from 'react-icons/cg';
import { NoteProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDdirection: 'row',
      height: '100vh',
      width: '100%',
    },
    loading: {
      margin: '20px 20px 0px 20px',
    },
    progress: {
      width: '100%',
      margin: '20px 20px 0px 20px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    box: {
      display: 'flex',
      flexDdirection: 'column',
      backgroundColor: 'rgb(248, 248, 248)',
      height: '100vh',
      resize: 'horizontal',
      minWidth: '200px',
      width: '300px',
      maxWidth: '400px',
      overflow: 'hidden',
      borderRight: '1px solid rgb(230, 230, 230)',
    },
    empty: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      textAlign: 'center',
      padding: '35px',
    },
    emptyIcon: {
      fontSize: '75px',
    },
    newNoteText: {
      cursor: 'pointer',
      color: 'rgb(0,168,45)',
    },
  })
);

export default function Note(props: NoteProps) {
  const { notebook, addNewNote, currentNoteId } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {notebook ? (
          <div className={classes.box}>
            <NoteList {...props} />
          </div>
        ) : (
          <div className={classes.empty}>
            <div className={classes.emptyIcon}>
              <CgNotes />
            </div>
            <div>It all begins with notes</div>
            <div>
              Click the{' '}
              <span
                onClick={() => addNewNote('', '')}
                className={classes.newNoteText}
              >
                + New Note
              </span>{' '}
              button in the side bar to create note.
            </div>
          </div>
        )}
        <div>
          {notebook && currentNoteId && (
            <>
              <EditorTitle {...props} />
              <Editor {...props} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
