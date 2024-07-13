import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';

const DeleteConfirmationModal = () => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal dismissible show={isOpen} onClose={closeModal} size='lg'>
        <Modal.Body>
          <div className='text-center'>
            <svg fill='#F05252' viewBox='0 0 32 32' className='mx-auto mb-4 w-20 h-20 text-red-500' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15 21.063v-15.063c0-0.563 0.438-1 1-1s1 0.438 1 1v15.063h-2zM15 23.031h2v1.875h-2v-1.875zM0 16c0-8.844 7.156-16 16-16s16 7.156 16 16-7.156 16-16 16-16-7.156-16-16zM30.031 16c0-7.719-6.313-14-14.031-14s-14 6.281-14 14 6.281 14 14 14 14.031-6.281 14.031-14z'></path>
            </svg>
            <h3 className='my-6 text-2xl font-normal text-gray-500'>주소를 삭제하시겠습니까?</h3>
            <div className='flex justify-center gap-4'>
              <button onClick={() => setIsUpdate(false)} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
                삭제
              </button>
              <button onClick={() => setIsUpdate(false)} className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500`}>
                취소
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
