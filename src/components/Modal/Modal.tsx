import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import {useState} from 'react';
import React from 'react';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const ModalWindow: React.FC<ModalProps> = ({onClose, children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = (): void => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return isOpen ? (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}></div>
      <div className={styles.modal} role="dialog">
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </>
  ) : null;
};

const Modal: React.FC<ModalProps> = ({open, onClose, children}) => {
  return open ? createPortal(<ModalWindow onClose={onClose}>{children}</ModalWindow>, document.body) : null;
};

export {Modal};
