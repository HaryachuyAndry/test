import clsx from 'clsx';
import React, { useState } from 'react';
import ICONS from '../../assets/icons';
import styles from './styles.module.scss';

function SwapButton({ onClick }: { onClick: () => void }) {
  const [rotate, steRotate] = useState(false);

  return (
    <button
      className={clsx(styles.button, rotate && styles.button_rotate)}
      onClick={() => {
        onClick();
        steRotate((prev) => !prev);
      }}
    >
      {ICONS.utils.swap}
    </button>
  );
}

export default SwapButton;
