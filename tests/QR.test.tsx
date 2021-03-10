import React from 'react';
import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QR } from '../src/components/QR';

describe('QR component', () => {
  test('render QR component', () => {
    const onClose = jest.fn();

    render(<QR open={true} onClose={onClose} />);

    userEvent.click(screen.getByTestId('backdrop'));
    expect(onClose).toBeCalledTimes(1);
  });
});
