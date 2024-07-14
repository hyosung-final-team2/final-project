import { Modal } from 'flowbite-react';
import MemberInfo from '../common/Info/MemberInfo';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberPaymentTable from './MemberPaymentTable/MemberPaymentTable';
import { useGetPaymentDetail, useDeletePaymentMethod } from '../../api/PaymentMethod/Modal/queris';
import PaymentInfo from './PaymentInfo';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';

const MemberPaymentMethodModal = ({ isOpen, setOpenModal, title, paymentMethodId, setPaymentMethodId, currentPage }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { isUpdate, setIsUpdate } = paymentMethodStore();
  const { data: detail } = useGetPaymentDetail(paymentMethodId);
  const { mutate: deleteMutate } = useDeletePaymentMethod(currentPage);

  const memberInfo = detail?.data?.data;

  const member = {
    name: memberInfo?.memberName || '',
    email: memberInfo?.memberEmail || '',
    phone: memberInfo?.memberPhone || '',
    createdAt: memberInfo?.registrationDate !== null ? memberInfo?.registrationDate || '' : '-',
  };

  return (
    <>
      <Modal
        dismissible
        show={isOpen}
        onClose={() => {
          setIsUpdate(false), setOpenModal(false);
        }}
        theme={customModalTheme}
        size='5xl'
      >
        <Modal.Header>
          <div className='text-3xl font-bold'>{isUpdate ? '결제수단 수정' : '회원 상세'}</div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            {/* {children} */}
            <MemberInfo member={member} searchable={true} title='회원정보' />
            {isUpdate && <PaymentInfo isUpdate={isUpdate} />}
            <MemberPaymentTable payments={memberInfo?.paymentMethods} title={`${member.name}님의 결제수단`} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isUpdate ? (
            <>
              <button onClick={() => setIsUpdate(true)} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
                수정
              </button>
              <button
                onClick={() => {
                  deleteMutate(paymentMethodId);
                  setIsUpdate(false);
                  setOpenModal(false);
                }}
                className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsUpdate(false)} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
                확인
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberPaymentMethodModal;
