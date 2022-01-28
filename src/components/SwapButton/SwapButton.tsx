import React from 'react';
import ICONS from '../../assets/icons';
import styles from './styles.module.scss';

function SwapButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {ICONS.utils.swap}
    </button>
  );
}

export default SwapButton;
