import { State } from './State';
import { Action } from './Action';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'month':
      return { ...state, month: action.value };
    case 'year':
      return { ...state, year: action.value };
    case 'drawer':
      return { ...state, drawerOpen: action.value };
    case 'qr':
      return { ...state, qrOpen: action.value };
    case 'snack':
      return { ...state, snackOpen: action.value };
    default:
      return state;
  }
};
