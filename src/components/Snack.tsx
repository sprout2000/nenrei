import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { TransitionDown } from './TransitionDown';

type Props = {
  snackOpen: boolean;
  toggleSnack: () => void;
};

export const Snack: React.FC<Props> = (props) => {
  const handleClose = (
    _e?: React.SyntheticEvent,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    props.toggleSnack();
  };
  return (
    <Snackbar
      open={props.snackOpen}
      TransitionComponent={TransitionDown}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <SnackbarContent
        message="© 2019-2021 sprout2000."
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            OK
          </Button>
        }
      />
    </Snackbar>
  );
};
