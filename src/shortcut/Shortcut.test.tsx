import React from 'react';
import { render, screen } from '@testing-library/react';
import Shortcut from './Shortcut';

test('renders an icon shortcut', () => {
  render(<Shortcut title={'default'} x={10} y={10} />);
});
