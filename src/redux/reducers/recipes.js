// Actions
import { REQUEST_RECIPES, REQUEST_SUCCESS, REQUEST_FAIL } from '../actions';

// Inicial State
const INITIAL_STATE = {
  loading: false,
  recipes: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPES:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      loading: false,
      recipes: action.payload,
    };
  case REQUEST_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default: return state;
  }
};

export default recipes;
