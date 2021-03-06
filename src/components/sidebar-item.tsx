import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { useDrop } from 'react-dnd';
import Tooltip from '@material-ui/core/Tooltip';
import { SidebarItemProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listSelected: {
      backgroundColor: 'rgb(64,64,64)',
      borderRadius: '3px',
      '&:hover': {
        backgroundColor: 'rgb(51,51,51)',
        borderRadius: '3px',
      },
    },
    list: {
      '&:hover': {
        backgroundColor: 'rgb(51,51,51)',
        borderRadius: '3px',
      },
    },
    icon: {
      minWidth: '36px',
      color: 'rgb(165,165,165)',
    },
    removeNotebookIcon: {
      color: 'red',
      marginLeft: '20px',
    },
    menuNotebookIcon: {
      color: 'rgb(51,51,51)',
      marginLeft: '20px',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'rgb(222, 222, 222)',
      boxShadow: theme.shadows[5],
      padding: '20px',
      textAlign: 'center',
      width: '350px',
      borderRadius: '5px',
      fontSize: '12px',
      outline: 'none',
    },
    paragraph: {
      fontSize: '16px',
      color: 'rgb(66, 54, 48)',
      marginBottom: '10px',
      padding: '10px',
    },
    button: {
      height: '30px',
      margin: '10px 15px',
    },
  })
);

const SidebarItem = ({ removeNotebook, thisNotebook, moveNote, notebook, notebooks, open, handleNotebookClick }: SidebarItemProps) => {
  const classes = useStyles();
  const [removeNotebookButton, setRemoveNotebookButton] = useState<boolean>(
    false
  );
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const removeNewNotebook = () => {
    setOpenModal(true);
  };

  const handleDeleteClick = () => {
    removeNotebook(thisNotebook);
    handleModalClose();
  };

  const [{ isOver, item }, drop] = useDrop({
    accept: 'note',
    drop: () => moveThisNote(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const moveThisNote = () => {
    if (item?.notebook !== thisNotebook) {
      moveNote(item?.notebook, thisNotebook, item?.id);
    }
  };

  return (
    <>
      <ListItem
        button
        key={notebooks[thisNotebook].id}
        className={
          notebook === thisNotebook
            ? classes.listSelected
            : classes.list
        }
        onClick={() => {
          if (!removeNotebookButton)
            handleNotebookClick(thisNotebook);
        }}
        style={{
          padding: open ? '0px 0px 0px 30px' : '0px 15px',
          backgroundColor: isOver ? 'green' : '',
          borderRadius: isOver ? '5px' : '',
        }}
        ref={drop}
      >
        <ListItemIcon>
          <ImportContactsIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={notebooks[thisNotebook].title} />
        <Tooltip title="Click to delete this notebook" arrow>
          <ListItemIcon
            onClick={() => {
              removeNewNotebook();
            }}
            onMouseOver={() => setRemoveNotebookButton(true)}
            onMouseLeave={() => setRemoveNotebookButton(false)}
          >
            {removeNotebookButton && open ? (
              <RemoveIcon className={classes.removeNotebookIcon} />
            ) : (
              <MoreHorizIcon className={classes.menuNotebookIcon} />
            )}
          </ListItemIcon>
        </Tooltip>
      </ListItem>
      <Modal
        className={classes.modal}
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <div className={classes.paragraph}>
              This will delete the folder and move all notes in this folder to
              trash.
            </div>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={handleDeleteClick}
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
        </Fade>
      </Modal>
    </>
  );
};

export default SidebarItem;
