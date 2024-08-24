// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to ethereum coin flip/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders connect wallet message', () => {
  render(<App />);
  const connectWalletElement = screen.getByText(/please connect your wallet/i);
  expect(connectWalletElement).toBeInTheDocument();
});