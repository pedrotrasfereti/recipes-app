import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';
import App from '../App';

const PROFILE_EMAIL = 'profile-email';
const DONE_BTN = 'profile-done-btn';
const FAVORITE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';

let mockHistory = {};

describe('1. Testar o componente profile', () => {
  beforeEach(() => {
    const email = JSON.stringify({ email: 'email@example.com' });
    const { history } = renderWithReduxAndRouter(<App />,
      { items: { user: email }, initialEntries: ['/perfil'] });
    mockHistory = history;
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
  });
  it('1-1. Testar se os elementos do profile estão sendo renderizados', () => {
    const profileEmail = screen.getByTestId(PROFILE_EMAIL);
    const doneBtn = screen.getByTestId(DONE_BTN);
    const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
    const logoutBtn = screen.getByTestId(LOGOUT_BTN);

    expect(profileEmail).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it('1-1. Testar a funcionalidade do botão logout', () => {
    const logoutBtn = screen.getByTestId(LOGOUT_BTN);
    userEvent.click(logoutBtn);

    expect(mockHistory.location.pathname).toBe('/');
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
