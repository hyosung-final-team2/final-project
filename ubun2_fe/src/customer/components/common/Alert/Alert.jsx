import { Modal, Button } from 'flowbite-react';

const customButton = {
  color: {
    customPrimary:
      'border border-main bg-main text-white focus:ring-custom-alert-bg-purple enabled:hover:bg-custom-alert-bg-purple enabled:hover:text-main enabled:hover:border-custom-alert-bg-purple dark:border-main dark:bg-custom-alert-bg-purple dark:text-main dark:focus:ring-main dark:enabled:hover:border-main dark:enabled:hover:bg-main dark:hover:text-white',
  },
};

const Alert = ({ show, onClose, content, IconComponent }) => {
  return (
    <Modal dismissible show={show} size='md' popup onClose={onClose}>
      <Modal.Body className='text-center'>
        <div className='flex flex-col items-center justify-center mt-4'>
          <div className='p-5'>
            <IconComponent className='w-20 h-20 p-3 mb-4 rounded-full text-custom-alert-check bg-custom-alert-bg-purple' />
          </div>
          <h3 className='mb-3 text-3xl font-bold text-gray-800 dark:text-gray-400'>{content.message}</h3>
          <p className='mb-5 text-sm font-normal text-gray-500 dark:text-gray-200'>{content.subMessage}</p>
          <div className='w-full mt-5'>
            <Button className='w-full' theme={customButton} color='customPrimary' onClick={onClose}>
              확인
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Alert;
