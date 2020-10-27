import { SET_USER, LOGOUT_USER } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: '' };

    default:
      return state;
  }
};
