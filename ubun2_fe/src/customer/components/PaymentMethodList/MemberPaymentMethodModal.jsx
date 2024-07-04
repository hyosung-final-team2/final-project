import { Modal } from 'flowbite-react';
import MemberInfo from '../common/Info/MemberInfo';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberPaymentTable from './MemberPaymentTable/MemberPaymentTable';
import PaymentInfo from './PaymentInfo';

const MemberPaymentMethodModal = ({ isOpen, setOpenModal, title, children, primaryButtonText, secondaryButtonText, onPrimaryClick, onSecondaryClick }) => {
  const hong = {
    name: '홍길동',
    email: 'owen123@naver.com',
    phone: '010-2401-1235',
    createdAt: '2024-01-14',
  };

  const existingPaymentMethods = [
    { id: 1, type: '카드', company: '현대카드', number: '1111-****-****-4444', expiry: '24/08' },
    { id: 2, type: '계좌', company: '국민은행', number: '1002-***-***-004', expiry: '24/08' },
    { id: 3, type: '카드', company: '우리카드', number: '1111-****-****-4444', expiry: '24/08' },
  ];
  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='5xl'>
        <Modal.Header>
          <div className='text-3xl font-bold'>
            {title}
            <div className='text-3xl font-bold'>결제수단 등록</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            {/* {children} */}
            <MemberInfo member={hong} searchable={true} title='회원정보' />
            <PaymentInfo />
            <MemberPaymentTable payments={existingPaymentMethods} title='홍길동님의 결제수단 목록' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            className='focus:outline-none w-20 text-custom-font-purple bg-custom-button-purple hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            등록
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

export default MemberPaymentMethodModal;
