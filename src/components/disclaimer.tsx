import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
  title: {
    fontSize: '22px',
    color: 'rgb(65, 165, 75)',
  },
  button: {
    height: '30px',
    marginTop: '10px',
    marginBottom: '5px',
  },
  paragraph: {
    fontSize: '12px',
    color: 'black',
    marginBottom: '5px',
  },
  support: {
    fontSize: '12px',
    color: 'black',
    marginTop: '5px',
  },
  email: {
    fontSize: '12px',
    color: 'rgb(66, 54, 48)',
  },
}));

interface IndexProps {
  setIsAcceptDisclaimer: (isAcceptDisclaimer: boolean) => void;
}

function Disclaimer(props: IndexProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptClick = () => {
    localStorage.setItem('omeganoteaccept', 'true');
    props.setIsAcceptDisclaimer(true);
    handleClose();
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p className={classes.title}>Welcome to Omega Note</p>
            <div className={classes.paragraph}>
              This app is created strictly for demonstration purposes. By
              clicking the button below, you accept that Omega Note does not
              guarantee storing your messages.
            </div>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={handleAcceptClick}
            >
              Accept
            </Button>
            <p className={classes.paragraph}>
              I built this app using React, React Hooks, Next.js and Typescript
              to provide Note functions.
            </p>
            <div className={classes.support}>
              {'If you have any questions, please email to '}
              <a
                className={classes.email}
                href="mailto:omegathrone@omegathrone.com"
              >
                omegathrone@omegathrone.com
              </a>
              .
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default Disclaimer;
