import React from 'react';
import Navigation from '../blocks/Navigation';
import styles from './styles.module.scss';

interface IMainLayout {
  children: React.ReactNode;
}

function MainLayout({ children }: IMainLayout) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__navigation}>
        <Navigation />
      </div>
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
}

export default MainLayout;
