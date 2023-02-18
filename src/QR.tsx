import { memo } from 'react';
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

export const QR = memo((props: Props): JSX.Element => {
  return (
    <div>
      <QRBackdrop open={props.qrOpen} onClick={props.onClose}>
        <QRCode value="https://sprout2000.github.io/nenrei" />
      </QRBackdrop>
    </div>
  );
});

QR.displayName = 'QR';
