import React from 'react';
import styles from './styles.module.scss';

interface ICustomButton {
  text: string;
  onClick?: () => void;
}

function CustomButton({ text, onClick }: ICustomButton) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default CustomButton;
