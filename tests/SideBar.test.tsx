import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SideBar from '../src/components/SideBar';

describe('SideBar component', () => {
  test('render SideBar component', () => {
    render(
      <SideBar
        drawerOpen={true}
        onQROpen={() => console.log('onQROpen(): void')}
        onSnackOpen={() => console.log('onSnackOpen(): void')}
        toggleDrawer={() => console.log('toggleDrawer(): void')}
      />
    );

    expect(screen.getByText(/年齢計算 v/)).toBeInTheDocument();

    expect(screen.getByAltText(/Logo/)).toHaveAttribute(
      'src',
      './icons/icon-288.png'
    );

    userEvent.click(screen.getByText(/このアプリを共有/));
    userEvent.click(screen.getByText(/ライセンスの表示/));
  });
});
