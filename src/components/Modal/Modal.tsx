import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import {useState} from 'react';
import React from 'react';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ModalWindow: React.FC<ModalProps> = ({onClose, children, ...props}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const modalClassName = [styles.modal, props.className].filter(Boolean).join(' ');
  const overlayClassName = ['overlay', styles.modalOverlay].filter(Boolean).join(' ');
  const closeButtonClassName = ['closeButton', styles.closeButton].filter(Boolean).join(' ');

  const handleClose = (): void => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return isOpen ? (
    <>
      <div className={overlayClassName} onClick={handleClose}></div>
      <div className={modalClassName} role="dialog">
        <button className={closeButtonClassName} onClick={handleClose}>
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
