// tests/CoinFlip.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoinFlip from '../src/components/CoinFlip';

test('calls onFlip when the button is clicked', () => {
  const onFlipMock = jest.fn();
  render(<CoinFlip onFlip={onFlipMock} />);

  const button = screen.getByText(/flip coin/i);
  fireEvent.click(button);

  expect(onFlipMock).toHaveBeenCalledTimes(1);
});