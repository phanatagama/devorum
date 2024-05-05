import { act, fireEvent, screen } from '@testing-library/react';

import { mockRouter } from '@/__mocks__/next-router-util';
import { renderWithProviders } from '@/__mocks__/wrapper';
import LoginPage from '@/app/login/page';

jest.mock('next/navigation', () => mockRouter);
describe('LoginPage', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
      useSelector: () => mockSelector,
    }));
  });

  it('should render correctly', async () => {
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

  it('should show error message when email & password is invalid', async () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submit');
    await act(async () => {
      fireEvent.change(emailInput, 'a@c');
      fireEvent.change(passwordInput, 'passwd');
      submitButton.click();
    });

    const emailError = await screen.findByText('Invalid email address');
    const passwdError = await screen.findByText(
      'Password must be at least 8 characters'
    );
    expect(emailError).toBeInTheDocument();
    expect(passwdError).toBeInTheDocument();
  });
  it('should not show error message when email & password is invalid', async () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submit');
    await act(async () => {
      fireEvent.change(emailInput, 'joko2024@gmail.com');
      fireEvent.change(passwordInput, 'dicoding2029');
      submitButton.click();
    });

    const emailError = await screen.findByText('Invalid email address');
    const passwdError = await screen.findByText(
      'Password must be at least 8 characters'
    );
    expect(emailError).toBeInTheDocument();
    expect(passwdError).toBeInTheDocument();
  });
});
