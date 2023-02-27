import 'vitest-canvas-mock';
import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App, calc, eto } from '../App';

test('test calc()', () => {
  const thisYear = new Date().getFullYear();
  const myAge = thisYear - 1971;
  expect(calc(1971, 1)).toEqual(myAge);
});

test('test eto()', () => {
  expect(eto(1971)).toBe('辛亥（いのしし）');
});

test('render App component #1', async () => {
  render(<App />);

  await userEvent.click(screen.getByLabelText('menu'));

  const selectors = screen.getAllByRole('button');
  await userEvent.click(selectors[0]);

  const ySelector = screen.getByLabelText('years');
  const yButton = within(ySelector).getByRole('button') as HTMLInputElement;
  fireEvent.mouseDown(yButton);

  const yList = within(screen.getByRole('presentation')).getByRole('listbox');
  const yOptions = within(yList).getAllByRole('option');
  fireEvent.click(yOptions[yOptions.length - 1]);
  expect(yButton.textContent).toMatch(`${new Date().getFullYear()}`);

  const mSelector = screen.getByLabelText('months');
  const mButton = within(mSelector).getByRole('button') as HTMLInputElement;
  fireEvent.mouseDown(mButton);

  const mList = within(screen.getByRole('presentation')).getByRole('listbox');
  const mOptions = within(mList).getAllByRole('option');
  fireEvent.click(mOptions[0]);
  expect(mButton.textContent).toBe('1月');
});
