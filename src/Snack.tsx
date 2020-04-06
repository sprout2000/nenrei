import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import TransitionDown from './TransitionDown';

interface Props {
  snackOpen: boolean;
  onClose: (
    _event?: React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void;
}

const Snack = (props: Props): JSX.Element => {
  return (
    <Snackbar
      open={props.snackOpen}
      TransitionComponent={TransitionDown}
      autoHideDuration={2500}
      onClose={props.onClose}>
      <SnackbarContent
        message="Copyright (C) 2020 Office Nishigami."
        action={
          <Button color="secondary" size="small" onClick={props.onClose}>
            OK
          </Button>
        }
      />
    </Snackbar>
  );
};

export default Snack;
