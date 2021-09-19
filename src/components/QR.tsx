import React from 'react';

import { QRCode } from 'react-qrcode-logo';

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

type Props = {
  qrOpen: boolean;
  toggleQR: () => void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  })
);

export const QR: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={props.qrOpen}
        onClick={props.toggleQR}
      >
        <QRCode value="https://sprout2000.github.io/nenrei" />
      </Backdrop>
    </div>
  );
};
