import React from 'react';
import styles from './Modal.module.scss';

import clsx from 'clsx';

interface IModal {
  children: React.ReactNode;
  visible: boolean;
  onClosePopup: () => void;
  className?: string;
}

const Modal = ({ children, className, visible, onClosePopup }: IModal) => {
  //-------------Layout:-----------------------------------
  return (
    <div
      className={clsx(styles.modal, visible && styles.modal__active, className)}
    >
      <div className={styles.modal__content}>
        <button
          type="reset"
          className={styles.modal__close}
          onClick={onClosePopup}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L1 9" stroke="#C4C4C4" />
            <path d="M1 1L9 9" stroke="#C4C4C4" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
