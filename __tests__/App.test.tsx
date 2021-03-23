import React from 'react';
import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../src/components/App';

describe('App component', () => {
  test('render App component', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(screen.getByRole('img', { name: 'Logo' })).toBeVisible();
    expect(screen.getByRole('list')).toBeVisible();
    expect(screen.getByRole('button', { name: 'レポジトリ' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'ライセンスの表示' })
    ).toBeVisible();

    userEvent.click(screen.getByRole('button', { name: 'このアプリを共有' }));
    expect(
      screen.getByRole('button', { name: '平成元年 (1989)' })
    ).toBeVisible();
  });
});
