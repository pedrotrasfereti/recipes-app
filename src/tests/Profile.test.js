// import React from 'react';
// import { screen } from '@testing-library/react';
// import { Profile } from '../pages';
// import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// const PROFILE_EMAIL = 'profile-email';
// const DONE_BTN = 'profile-done-btn';
// const FAVORITE_BTN = 'profile-favorite-btn';
// const LOGOUT_BTN = 'profile-logout-btn';

// describe('1. Testar o componente profile', () => {
//   beforeEach(() => {
//     renderWithReduxAndRouter(<Profile />);
//   });
//   it('1-1. Testar se os elementos do profile estão sendo renderizados', () => {
//     const profileEmail = screen.getByTestId(PROFILE_EMAIL);
//     const doneBtn = screen.getByTestId(DONE_BTN);
//     const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
//     const logoutBtn = screen.getByTestId(LOGOUT_BTN);

//     expect(profileEmail).toBeInTheDocument();
//     expect(doneBtn).toBeInTheDocument();
//     expect(favoriteBtn).toBeInTheDocument();
//     expect(logoutBtn).toBeInTheDocument();
//   });
// });
