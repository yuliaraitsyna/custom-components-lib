import './Modal.module.css';
import styles from './Modal.module.css';

import {createPortal} from 'react-dom';
import React, {useCallback} from 'react';
import clsx from 'clsx';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ModalWindow: React.FC<ModalProps> = ({onClose, children, className}) => {
  const modalClassName = clsx('modalWindow', className);

  const handleClose = useCallback((): void => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="modal">
      <div className={styles.modalOverlay} onClick={handleClose}></div>
      <div className={modalClassName} role="dialog">
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({open, onClose, children, className}) => {
  return open
    ? createPortal(
        <ModalWindow onClose={onClose} className={className}>
          {children}
        </ModalWindow>,
        document.body,
      )
    : null;
};

export {Modal};
