import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers';

const renderWithReduxAndRouter = (component, {
  initialState = {},
  initialEntries = ['/'],
} = {}) => {
  const history = createMemoryHistory(initialEntries);
  const store = createStore(rootReducer, initialState);
  return ({
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          { component }
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithReduxAndRouter;
