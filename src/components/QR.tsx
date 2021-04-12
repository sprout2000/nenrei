import React, { useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';

import { QRCode } from 'react-qrcode-logo';

import createStyles from '@material-ui/core/styles/createStyles';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from './App';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  })
);

const QR: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        data-testid="backdrop"
        open={state.qrOpen}
        onClick={() => dispatch({ type: 'qr', value: false })}>
        <QRCode value="https://sprout2000.github.io/nenrei" />
      </Backdrop>
    </div>
  );
};

export default QR;
