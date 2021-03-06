import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TitleBar from '../src/components/TitleBar';

describe('TitleBar component', () => {
  test('render TitleBar component', async () => {
    render(
      <TitleBar toggleDrawer={() => console.log('toggleDrawer(): void')} />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/年齢計算/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
  });
});
