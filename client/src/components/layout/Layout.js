import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { LayoutWrapper } from './Layout.styles';

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
