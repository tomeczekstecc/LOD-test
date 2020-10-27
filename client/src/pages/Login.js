import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import axios from 'axios';
import { LoginWrapper } from './Login.styles';

const Login = ({ history }) => {
  const authContext = useContext(AuthContext);

  const { user, setUser } = authContext;


  if(user.username){
    history.push('/')
  }

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPass(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password: pass,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    await axios.post('/api/auth/login', body, headers).then((res) => {
      setUser({
        accessToken: res.data.accessToken,
        username: res.data.username
      });

      history.push('/');
    });
  };

  return (
    <LoginWrapper>
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control has-icons-left has-icons-right'>
          {/* eslint-disable-next-line */}
          <input
            onChange={handleChange}
            className='input is-danger'
            type='email'
            placeholder='Email input'
            name='email'
            value={email}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-envelope'></i>
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-exclamation-triangle'></i>
          </span>
        </div>
        <p className='help is-danger'>This email is invalid</p>
      </div>

      <div className='field'>
        <label className='label'>Pass</label>
        <div className='control has-icons-left has-icons-right'>
          {/* eslint-disable-next-line */}
          <input
            className='input is-success'
            type='password'
            placeholder='Text input'
            name='password'
            value={pass}
            onChange={handleChange}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-key'></i>
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-check'></i>
          </span>
        </div>
        <p className='help is-success'>This password is correct</p>
      </div>

      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link' onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className='control'>
          <button className='button is-link is-light'>Cancel</button>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
