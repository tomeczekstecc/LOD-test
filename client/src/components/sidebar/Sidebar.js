import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { SidebarWrapper } from './Sidebar.styles';

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const { logoutCallback } = authContext;

  const links = [
    {
      name: 'Zaloguj się',
      path: '/login',
    },
    {
      name: 'Miesiąc',
      path: '/month',
    },
  ];

  return (
    <SidebarWrapper>
      <aside className='menu'>
        <ul className='menu-list'>
          <li>
            <a onClick={logoutCallback}>Wyloguj się </a>
          </li>
        </ul>
        {links.map((link) => (
          <div key={link.name}>
            <ul className='menu-list'>
              <li>
                <Link to={link.path}>{link.name}</Link>
              </li>
            </ul>
          </div>
        ))}
      </aside>
    </SidebarWrapper>
  );
};

export default Sidebar;
