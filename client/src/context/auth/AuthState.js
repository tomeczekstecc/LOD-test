import React, { useReducer, useEffect } from 'react';
import { SET_USER, LOGOUT_USER } from '../types';
import { Redirect } from 'react-router-dom';
import authReducer from './authReducer';
import AuthContext from './authContext';

const AuthState = (props) => {
  const initialState = {
    user: '',
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkRefreshToken = async () => {
      const result = await (
        await fetch('/api/auth/refresh_token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
      ).json();
      await setUser({
        username: result.loggedInUsername,
        accessToken: result.accessToken,
      });
    };
    checkRefreshToken();
  }, []);

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const logoutCallback = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    dispatch({
      type: LOGOUT_USER,
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, setUser, logoutCallback }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
