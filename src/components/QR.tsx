import { QRCode } from 'react-qrcode-logo';

import Backdrop from '@material-ui/core/Backdrop';
import createStyles from '@material-ui/core/styles/createStyles';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  qrOpen: boolean;
  onClose: () => void;
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

export const QR = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={props.qrOpen}
        onClick={props.onClose}
      >
        <QRCode value="https://sprout2000.github.io/nenrei" />
      </Backdrop>
    </div>
  );
};
