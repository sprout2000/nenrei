import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Snack from '../src/components/Snack';

describe('Snack component', () => {
  test('render Snack component', () => {
    const onClose = jest.fn();

    render(<Snack snackOpen={true} onClose={onClose} />);

    expect(
      screen.getByText('Copyright © 2019-2021 sprout2000.')
    ).toBeInTheDocument();

    const text = screen.getByRole('button').firstChild;
    expect(text).toHaveTextContent(/OK/);

    userEvent.click(screen.getByRole('button'));
    expect(onClose).toBeCalledTimes(1);
  });
});
