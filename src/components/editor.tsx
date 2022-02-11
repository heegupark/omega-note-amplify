import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { HiDotsHorizontal } from 'react-icons/hi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { NoteProps, NoteType } from './types';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      outline: 'none',
      width: '95%',
      paddingLeft: '15px',
      margin: '0px',
      border: 'none',
      backgroundColor: 'rgb(248,248,248)',
      fontSize: '24px',
    },
    editor: {
      wordBreak: 'break-word',
      height: '88vh',
    },
    editorInTrash: {
      width: '100%',
      minWidth: '600px',
      wordBreak: 'break-word',
      padding: '15px',
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    dot: {
      cursor: 'pointer',
      padding: '5px',
      verticalAlign: 'middle',
      '&:hover': {
        color: 'grey',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'rgb(222, 222, 222)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2, 2),
      textAlign: 'center',
      width: '350px',
      borderRadius: '5px',
      fontSize: '12px',
      outline: 'none',
    },
    button: {
      height: '30px',
      margin: '10px 15px',
    },
  })
);

const theme = 'snow';
const placeholder = `What's in your mind?`;
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }, { color: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  'header',
  'font',
  'color',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  // 'video',
];

const Editor = ({ notebooks, notebook, currentNoteId, updateNote, moveNote, handleSnackbar, deleteNote }: NoteProps) => {
  const [isOpen, setOpen] = useState(false);
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const classes = useStyles();
  const [title, setTitle] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');
  const [lastNotebook, setLastNotebook] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    handlePopoverClose();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleChange = (html: string) => {
    setContents(html);
    const newNote = {
      noteTitle: undefined,
      note: html,
    };
    updateNote(
      notebooks[notebook].id,
      currentNoteId,
      newNote
    );
  };

  useEffect(() => {
    const getNote = (notebookId: string, noteId: string | undefined) => {
      const newContents = notebooks[notebookId].notes.filter(
        (note: NoteType) => note.id === noteId
      );
      if (newContents.length) {
        setTitle(newContents[0].noteTitle);
        setContents(newContents[0].note);
        setIsDeleted(newContents[0].isDeleted);
        setLastNotebook(newContents[0].lastNotebook);
      }
    };
    getNote(notebook, currentNoteId);
  }, [notebook, currentNoteId, notebooks]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const newNote = {
      noteTitle: e.target.value,
      note: undefined,
    };
    updateNote(
      notebooks[notebook].id,
      currentNoteId,
      newNote
    );
  };

  const handleMoveToTrash = () => {
    moveNote(notebook, 'trash', currentNoteId);
    handlePopoverClose();
  };

  const handleRestore = () => {
    moveNote('trash', lastNotebook, currentNoteId);
    handlePopoverClose();
  };

  const handleDelete = () => {
    deleteNote('trash', currentNoteId);
    handlePopoverClose();
    handleModalClose();
  };

  return (
    <>
      {isDeleted ? (
        <div className={classes.box}>
          <span
            className={classes.title}
            onClick={() =>
              handleSnackbar(
                'You can not update a note title in the Trash',
                'error'
              )
            }
          >
            {title}
          </span>
          <Tooltip title="Click to restore or delete" arrow>
            <>
              <Menu
                id="dot-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handlePopoverClose}
              >
                <MenuItem onClick={handleRestore}>Restore</MenuItem>
                <MenuItem onClick={handleModalOpen}>Delete</MenuItem>
              </Menu>
              <span className={classes.dot} onClick={handlePopoverOpen}>
                <HiDotsHorizontal />
              </span>
            </>
          </Tooltip>
          <div
            className={classes.editorInTrash}
            dangerouslySetInnerHTML={{ __html: contents }}
            onClick={() =>
              handleSnackbar(
                'You can not update a note in the Trash',
                'error'
              )
            }
          />
          <Modal
            open={modalOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
          >
            <div className={classes.paper}>
              <h2 id="simple-modal-title">Are you really want to delete?</h2>
              <p id="simple-modal-description">
                You will permanently delete this note.
              </p>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="default"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      ) : (
        <>
          <input
            value={title}
            className={classes.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTitleChange(e)
            }
          />
          <Menu
            id="dot-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handlePopoverClose}
          >
            <MenuItem onClick={handleMoveToTrash}>Move to trash</MenuItem>
          </Menu>
          <Tooltip title="Click to move this note to trash" arrow>
            <span className={classes.dot} onClick={handlePopoverOpen}>
              <HiDotsHorizontal />
            </span>
          </Tooltip>
          {!!ReactQuill && isOpen && (
            <ReactQuill
              theme={theme}
              onChange={handleChange}
              value={contents}
              modules={modules}
              formats={formats}
              bounds={'.app'}
              placeholder={placeholder}
              className={classes.editor}
            />
          )}
        </>
      )}
    </>
  );
}

export default Editor;
