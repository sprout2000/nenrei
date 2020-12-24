import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import App from '../src/Components/App';

describe('App components', () => {
  test('render App components', () => {
    const { getByText } = render(<App />);

    expect(getByText(/生まれ年と月/)).toBeInTheDocument();
  });
});
