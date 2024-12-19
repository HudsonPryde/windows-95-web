import React from 'react';
import { render, screen } from '@testing-library/react';
import Window from './Window';

test('renders square window', () => {
  render(<Window title="Welcome" zindex={0} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
