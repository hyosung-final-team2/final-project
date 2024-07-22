import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { icons, buttonStyle } from './icons.jsx';

const ConfirmationModal = ({ message, icon, leftButton, leftButtonStyle, rigtButton, rigtButtonStyle, leftOnclick, rightOnclick }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 shadow-md';

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLeftButton = () => {
    leftOnclick();
    closeModal();
  };
  const handleRightButton = () => {
    rightOnclick();
    closeModal();
  };
  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal dismissible show={isOpen} onClose={closeModal} size='md'>
        <Modal.Body>
          <div className='text-center'>
            <div className=''>{icons[icon]}</div>
            <div className='my-4'>
              <h3 className='text-2xl font-normal text-gray-500'>{message}</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <button onClick={() => handleLeftButton} className={`${commonButtonStyles} ${buttonStyle[leftButtonStyle]}`}>
                {leftButton}
              </button>
              <button onClick={() => handleRightButton} className={`${commonButtonStyles} ${buttonStyle[rigtButtonStyle]}`}>
                {rigtButton}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
