import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { TransitionDown } from './TransitionDown';

interface Props {
  snackOpen: boolean;
  onClose: (
    _event?: React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void;
}

export const Snack: React.FC<Props> = (props) => {
  return (
    <Snackbar
      open={props.snackOpen}
      TransitionComponent={TransitionDown}
      autoHideDuration={2500}
      onClose={props.onClose}>
      <SnackbarContent
        message="Copyright © 2019-2021 sprout2000."
        action={
          <Button color="secondary" size="small" onClick={props.onClose}>
            OK
          </Button>
        }
      />
    </Snackbar>
  );
};
