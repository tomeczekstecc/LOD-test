import React from 'react';
import { WelcomeWrapper } from './Welcome.styles';

const Welcome = ({ username }) => {
  return (
    <WelcomeWrapper>
      Witaj <span className='has-text-light'>{username}</span>
    </WelcomeWrapper>
  );
};

export default Welcome;
