import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SideBar } from '../src/components/SideBar';

describe('SideBar component', () => {
  test('render SideBar component', () => {
    window.open = jest.fn();
    const onToggle = jest.fn();
    const onQROpen = jest.fn();
    const onSnackOpen = jest.fn();

    render(
      <SideBar
        drawerOpen={true}
        onQROpen={onQROpen}
        onSnackOpen={onSnackOpen}
        toggleDrawer={onToggle}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      './icons/icon-288.png'
    );

    userEvent.click(screen.getByRole('button', { name: 'このアプリを共有' }));
    expect(onQROpen).toBeCalledTimes(1);
    expect(onToggle).toBeCalledTimes(1);

    userEvent.click(screen.getByRole('button', { name: 'レポジトリ' }));
    expect(window.open).toBeCalledTimes(1);
    expect(onToggle).toBeCalledTimes(2);

    userEvent.click(screen.getByRole('button', { name: 'ライセンスの表示' }));
    expect(onSnackOpen).toBeCalledTimes(1);
    expect(onToggle).toBeCalledTimes(3);
  });
});
