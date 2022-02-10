import React, { useState, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import NoteRoundedIcon from '@material-ui/icons/NoteRounded';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import IMainProps from './interfaces/imainprops';
import SideBarItem from './sidebar-item';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDrop } from 'react-dnd';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '5px',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: 'rgb(26,26,26)',
      color: 'rgb(165,165,165)',
      padding: '5px',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
      backgroundColor: 'rgb(26,26,26)',
      padding: '5px 0px',
    },
    toolbar: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    folder: {
      padding: '0px 10px',
      '&:hover': {
        backgroundColor: 'rgb(51,51,51)',
        borderRadius: '3px',
      },
    },
    folderSelected: {
      padding: '0px 10px',
      backgroundColor: 'rgb(64,64,64)',
      borderRadius: '3px',
      '&:hover': {
        backgroundColor: 'rgb(51,51,51)',
        borderRadius: '3px',
      },
    },
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
      minWidth: '40px',
      color: 'rgb(165,165,165)',
    },
    iconMinimized: {
      minWidth: '25px',
      color: 'rgb(165,165,165)',
    },
    addNoteIcon: {
      color: 'white',
    },
    addNotebookIcon: {
      color: 'rgb(75,165,65)',
      marginLeft: '30px',
    },
    addNote: {
      backgroundColor: 'rgb(0,168,45)',
      color: 'white',
      borderRadius: '50px',
      '&:hover': {
        backgroundColor: 'rgb(0,143,38)',
      },
      padding: '8px',
      margin: 'auto',
      height: '40px',
    },
    newnotebook: {
      width: '70%',
      padding: '10px 0px',
      height: '30px',
      margin: '1px 0px',
      outline: 'none',
      color: 'rgb(165, 165, 165)',
      border: 'none',
      borderBottom: '1px solid rgb(165, 165, 165)',
      backgroundColor: 'transparent',
      fontWeight: 400,
      fontSize: '1rem',
    },
    menuNotebookIcon: {
      color: 'rgb(51,51,51)',
      marginLeft: '30px',
    },
  })
);

interface SidebarProps extends IMainProps {
  setNotebook: (notebook: string) => void;
  handleNotebookClick: (notebookId: string) => void;
  addNewNotebook: (_id: string, title: string) => void;
  removeNotebook: (notebook: string) => void;
  setView: (view: string) => void;
}

export default function Sidebar(props: SidebarProps) {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(true);
  const [addNotebookButton, setAddNotebookButton] = useState<boolean>(false);
  const [addNotebook, setAddNotebook] = useState<boolean>(false);
  const [newNotebook, setNewNotebook] = useState<string>('');
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const addNewNotebook = () => {
    setOpen(true);
    setAddNotebook(true);
  };

  const handleAddNewNotebook = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newNotebook.length > 0) {
      props.addNewNotebook('', newNotebook);
      setAddNotebook(false);
      setNewNotebook('');
    }
  };

  const [{ isOver, item }, drop] = useDrop({
    accept: 'note',
    drop: () => moveToTrash(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const moveToTrash = () => {
    props.moveNote(item?.notebook, 'trash', item?.id);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <List>
        <ListItem key="o-note">
          <ListItemIcon>
            <img
              alt="o-logo"
              src="./images/o-logo.png"
              style={{ width: '22px', height: '22px' }}
            />
          </ListItemIcon>
          <ListItemText primary="o-note" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          key="add-note"
          disabled={props.notebook === 'trash'}
          className={classes.addNote}
          style={{ width: open ? '85%' : '70%' }}
          onClick={() => {
            if (props.notebook) {
              props.addNewNote('', '');
            } else {
              addNewNotebook();
            }
          }}
        >
          <ListItemIcon style={{ minWidth: '35px' }}>
            <Tooltip title="Click to add a note" arrow>
              <AddIcon className={classes.addNoteIcon} />
            </Tooltip>
          </ListItemIcon>
          <Tooltip title="Click to add a notebook" arrow>
            {props.notebook ? (
              <ListItemText primary={open ? 'New Note' : ''} />
            ) : (
              <ListItemText primary={open ? 'New Notebook' : ''} />
            )}
          </Tooltip>
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          key="Notebooks"
          className={
            props.notebook === '' ? classes.folderSelected : classes.folder
          }
          style={{ padding: open ? '0px 10px' : '0px 15px' }}
        >
          <ListItemIcon>
            <NoteRoundedIcon
              className={open ? classes.icon : classes.iconMinimized}
              onClick={() => {
                props.handleNotebookClick('');
                props.setView('notebooks');
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Notebooks"
            onClick={() => {
              props.handleNotebookClick('');
              props.setView('notebooks');
            }}
          />
          <Tooltip title="Click to add a notebook" arrow>
            <ListItemIcon
              onClick={() => {
                addNewNotebook();
              }}
              onMouseOver={() => setAddNotebookButton(true)}
              onMouseLeave={() => setAddNotebookButton(false)}
            >
              {addNotebookButton && open ? (
                <AddIcon className={classes.addNotebookIcon} />
              ) : (
                <MoreHorizIcon className={classes.menuNotebookIcon} />
              )}
            </ListItemIcon>
          </Tooltip>
        </ListItem>

        {props.notebookOrder.length > 0
          ? props.notebookOrder.map((notebook: any) => {
              return (
                <SideBarItem
                  key={notebook}
                  {...props}
                  thisNotebook={notebook}
                  open={open}
                />
              );
            })
          : ''}
        {addNotebook && (
          <ListItem
            style={{
              padding: open ? '0px 0px 0px 30px' : '0px 15px',
            }}
          >
            <ListItemIcon>
              <ImportContactsIcon
                className={open ? classes.icon : classes.iconMinimized}
              />
            </ListItemIcon>
            <input
              autoFocus
              value={newNotebook}
              placeholder="New Notebook"
              className={classes.newnotebook}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewNotebook(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent) => {
                handleAddNewNotebook(e);
              }}
              onBlur={() => setAddNotebook(false)}
            />
          </ListItem>
        )}
      </List>
      <List>
        <ListItem
          button
          key="Trash"
          className={
            props.notebook === 'trash' ? classes.folderSelected : classes.folder
          }
          onClick={() => props.handleNotebookClick('trash')}
          style={{
            padding: open ? '0px 10px' : '0px 15px',
            backgroundColor: isOver ? 'rgb(249,56,0)' : '',
            color: isOver ? 'white' : 'rgb(123,123,123)',
            borderRadius: isOver ? '5px' : '',
          }}
          ref={drop}
        >
          <ListItemIcon>
            <DeleteOutlineRoundedIcon
              className={open ? classes.icon : classes.iconMinimized}
            />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle} className={classes.icon}>
          {open ? (
            <Tooltip title="Click to close" arrow>
              <ChevronLeftIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Click to open" arrow>
              <ChevronRightIcon />
            </Tooltip>
          )}
        </IconButton>
      </div>
    </Drawer>
  );
}
