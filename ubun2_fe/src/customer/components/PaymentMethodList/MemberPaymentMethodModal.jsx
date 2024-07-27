import { Modal } from 'flowbite-react';
import MemberInfo from '../common/Info/MemberInfo';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberPaymentTable from './MemberPaymentTable/MemberPaymentTable';
import { useGetPaymentDetail, useDeletePaymentMethod } from '../../api/PaymentMethod/Modal/queris';
import PaymentInfo from './PaymentInfo';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodCard from './PaymentMethodCard';
import { useState, useEffect } from 'react';
import InputLabel from '../common/Input/InputLabel';
import { formatCardNumber } from '../../utils/cardFormat';
import PaymentMethodAccount from './PaymentMethodAccount';
import { getCardColor } from '../../../member/components/PaymentMethod/CardList';

const MemberPaymentMethodModal = ({ isOpen, setOpenModal, title, paymentMethodId, setPaymentMethodId, currentPage, clickedPayment }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const [isFlipped, setIsFlipped] = useState(false);

  const { isUpdate, setIsUpdate, paymentMethodType, setModalPaymentId } = paymentMethodStore();
  const { data: detail } = useGetPaymentDetail(paymentMethodId);
  const { mutate: deleteMutate } = useDeletePaymentMethod(currentPage);

  const memberInfo = detail?.data?.data;

  const member = {
    name: memberInfo?.memberName || '',
    email: memberInfo?.memberEmail || '',
    phone: memberInfo?.memberPhone || '',
    createdAt: memberInfo?.registrationDate !== null ? memberInfo?.registrationDate || '' : '-',
  };

  const flipCard = flip => setIsFlipped(flip);

  const formattedCardNumber = clickedPayment?.cardNumber ? formatCardNumber(clickedPayment?.cardNumber) : '****-****-****-****';
  const formattedBankNumber = clickedPayment?.accountNumber ? formatCardNumber(clickedPayment?.accountNumber) : '****-****-****-****';

  useEffect(() => {
    setModalPaymentId(paymentMethodId);
  }, [paymentMethodId]);

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
            <div>
              <MemberInfo member={member} searchable={true} title='회원정보' />
            </div>
            <div>
              {isUpdate && <PaymentInfo isUpdate={isUpdate} />}
              {isUpdate ? (
                <MemberPaymentTable payments={memberInfo?.paymentMethods} title={`${member.name}님의 결제수단`} />
              ) : paymentMethodType !== 'ACCOUNT' ? (
                <div className='flex w-full'>
                  <PaymentMethodCard
                    isFlipped={isFlipped}
                    handleClick={() => flipCard(!isFlipped)}
                    cardCompany={clickedPayment?.cardCompany}
                    cardNumber={clickedPayment?.cardNumber}
                    memberName={clickedPayment?.memberName}
                  />
                  <div className='flex-1 p-3 space-y-3'>
                    <InputLabel labelTitle='카드사명' defaultValue={clickedPayment?.cardCompany} disabled />
                    <InputLabel labelTitle='카드번호' defaultValue={formattedCardNumber} disabled />
                    <InputLabel labelTitle='소유자명' defaultValue={clickedPayment?.memberName} disabled />
                    <InputLabel labelTitle='등록일' defaultValue={clickedPayment?.createdAt?.split('T')[0]} disabled />
                  </div>
                </div>
              ) : (
                <div className='flex w-full'>
                  <div className='flex-1 p-4'>
                    <PaymentMethodAccount
                      bankName={clickedPayment?.bankName}
                      accountNumber={clickedPayment?.accountNumber}
                      memberName={clickedPayment?.memberName}
                      bgColor={getCardColor(clickedPayment?.bankName)}
                    />
                  </div>
                  <div className='flex-1 p-3 space-y-3'>
                    <InputLabel labelTitle='은행명' defaultValue={clickedPayment?.bankName} disabled />
                    <InputLabel labelTitle='계좌번호' defaultValue={formattedBankNumber} disabled />
                    <InputLabel labelTitle='소유자명' defaultValue={clickedPayment?.memberName} disabled />
                    <InputLabel labelTitle='등록일' defaultValue={clickedPayment?.createdAt?.split('T')[0]} disabled />
                  </div>
                </div>
              )}
            </div>
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
