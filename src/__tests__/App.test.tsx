import 'vitest-canvas-mock';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../App';

test('render App component', async () => {
  render(<App />);

  await userEvent.click(screen.getByTestId('menu'));

  const selectors = screen.getAllByRole('button');
  await userEvent.click(selectors[0]);
});
