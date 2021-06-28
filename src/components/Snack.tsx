import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { TransitionDown } from './TransitionDown';
import { AppContext } from './App';

export const Snack: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleClose = (
    _e?: React.SyntheticEvent,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    dispatch({ type: 'snack', value: false });
  };
  return (
    <Snackbar
      open={state.snackOpen}
      TransitionComponent={TransitionDown}
      autoHideDuration={2500}
      onClose={handleClose}>
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
