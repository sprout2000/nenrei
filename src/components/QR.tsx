import { QRCode } from 'react-qrcode-logo';

import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';

type Props = {
  qrOpen: boolean;
  onClose: () => void;
};

const QRBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

export const QR = (props: Props): JSX.Element => {
  return (
    <div>
      <QRBackdrop open={props.qrOpen} onClick={props.onClose}>
        <QRCode value="https://nishigami.jp/nenrei" />
      </QRBackdrop>
    </div>
  );
};
