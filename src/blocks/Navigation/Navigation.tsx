import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../router/routes';
import styles from './styles.module.scss';

function Navigation() {
  return (
    <div className={styles.nav}>
      {routes.map((item) =>
        item.path === '*' ? null : (
          <NavLink key={item.path} to={item.path} className={styles.nav__link}>
            {item.icon} <span>{item.name}</span>
          </NavLink>
        )
      )}
    </div>
  );
}

export default Navigation;
