import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockRouter } from '@/__mocks__/next-router-util';
import { renderWithProviders } from '@/__mocks__/wrapper';
import LoginPage from '@/app/login/page';
/**
 * Test scenario for LoginPage component
 *
 * - Should display navbar component and input form with submit button
 * - Should handle email typing corretly
 * - Should handle password typing corretly
 * - Should show error message when email & password is invalid
 */

jest.mock('next/navigation', () => mockRouter);
describe('LoginPage test', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
      useSelector: () => mockSelector,
    }));
  });

  it('Should display navbar component and input form with submit button', async () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Forum')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();

    // INPUT FORM
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();

    // SUBMIT BUTTON
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });
  it('Should handle email typing corretly', async () => {
    renderWithProviders(<LoginPage />);
    const email = 'joko2024@gmail.com';
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
  });

  it('Should handle password typing corretly', async () => {
    renderWithProviders(<LoginPage />);
    const password = 'dicoding2029';
    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);
  });

  it('Should show error message when email & password is invalid', async () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submit');

    await userEvent.type(emailInput, 'a@c');
    await userEvent.type(passwordInput, 'passwd');
    await userEvent.click(submitButton);

    const emailError = await screen.findByText('Invalid email address');
    const passwdError = await screen.findByText(
      'Password must be at least 8 characters',
    );
    expect(emailError).toBeInTheDocument();
    expect(passwdError).toBeInTheDocument();
  });
});
