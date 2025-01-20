import './Modal.module.css';
import styles from './Modal.module.css';

import {createPortal} from 'react-dom';
import {useState} from 'react';
import React from 'react';
import clsx from 'clsx';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ModalWindow: React.FC<ModalProps> = ({onClose, children, className}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const modalClassName = clsx('modal', className);

  const handleClose = (): void => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return isOpen ? (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}></div>
      <div className={modalClassName} role="dialog">
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </>
  ) : null;
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
