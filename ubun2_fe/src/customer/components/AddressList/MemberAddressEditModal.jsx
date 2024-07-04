import { Modal } from 'flowbite-react';
import MemberInfo from '../common/Info/MemberInfo';
import InfoInput from '../common/Input/InfoInput';

const MemberAddressEditModal = ({ isOpen, setOpenEditModal, title, children, primaryButtonText, secondaryButtonText, onPrimaryClick, onSecondaryClick }) => {
  const hong = {
    name: '홍길동',
    email: 'owen123@naver.com',
    phone: '010-2401-1235',
    createdAt: '2024-01-14',
  };

  const infos = [
    {
      placeholder: '우편번호',
      value: '11111',
      label: '우편번호',
    },
    {
      placeholder: '도로명주소',
      value: '경기도 김포시 풍년로 100',
      label: '도로명주소',
    },
    {
      placeholder: '상세주소',
      value: '100동 100호',
      label: '상세주소',
    },
  ];

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenEditModal(false)} size='5xl'>
        <Modal.Header>
          <div className='text-3xl font-bold'>
            {title}
            <div className='text-3xl font-bold'>회원 주소지 수정</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            {children}
            <MemberInfo member={hong} title='회원정보' onlyInfo={true} />
            {/* <AddressInfo disabled={true} /> */}
            <InfoInput infos={infos} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            className='focus:outline-none w-20 text-custom-font-purple bg-custom-button-purple hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            수정
          </button>
          <button
            type='button'
            className='focus:outline-none w-20 text-custom-font-purple bg-custom-button-purple hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            취소
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberAddressEditModal;
