import React from 'react';
import { render, screen } from '@testing-library/react';
import Desktop from './Desktop';

test('renders an icon shortcut', () => {
  render(<Desktop />);
});
