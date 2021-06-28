export type Action =
  | {
      type: 'year';
      value: number;
    }
  | {
      type: 'month';
      value: number;
    }
  | {
      type: 'drawer';
      value: boolean;
    }
  | {
      type: 'qr';
      value: boolean;
    }
  | {
      type: 'snack';
      value: boolean;
    };
