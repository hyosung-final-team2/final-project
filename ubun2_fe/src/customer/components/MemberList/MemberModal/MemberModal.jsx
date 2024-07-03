import MemberInfo from './MemberInfo';
import { Modal } from 'flowbite-react';
import { memo } from 'react';

import { customModalTheme } from './modalStyle';

const MemberModal = ({ isOpen, setOpenModal, title, primaryButtonText, secondaryButtonText, onPrimaryClick, onSecondaryClick }) => {
  const hong = {
    memberName: '홍길동',
    memberEmail: 'owen123@naver.com',
    memberPhone: '010-2401-1235',
    memberCreatedAt: '2024-01-14',
  };

  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='6xl'>
        <Modal.Header>
          <div className='text-3xl font-bold'>{title}</div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            <MemberInfo member={hong} onlyInfo={true} title='회원정보' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}
            onClick={onPrimaryClick || (() => setOpenModal(false))}
          >
            <div>{primaryButtonText || '등록'}</div>
          </button>
          <button
            className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
            onClick={onSecondaryClick || (() => setOpenModal(false))}
          >
            {secondaryButtonText || '취소'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(MemberModal);
