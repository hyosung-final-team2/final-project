import { Table } from 'flowbite-react';
import { useDeletePaymentMethod } from '../../../api/PaymentMethod/Modal/queris';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore';
import { maskCardNumber } from '../../../utils/cardFormat';

const MemberPaymentTableRow = ({ paymentMethodId, paymentType, cardCompanyName, bankName, cardNumber, accountNumber, currentPage }) => {
  const isAccount = paymentType === 'ACCOUNT';
  const { isUpdate, modalPaymentId, setOpenModal } = paymentMethodStore();
  const { mutate: deleteMutate } = useDeletePaymentMethod();

  const handlePaymentDelete = paymentMethodId => {
    if (paymentMethodId === modalPaymentId) {
      deleteMutate(paymentMethodId);
      setOpenModal(false);
      return;
    }
    deleteMutate(paymentMethodId);
  };

  return (
    <>
      <Table.Row style={{ position: 'relative' }} className='bg-white'>
        <Table.Cell>{paymentMethodId}</Table.Cell>
        <Table.Cell>{isAccount ? '계좌' : '카드'}</Table.Cell>
        <Table.Cell>{isAccount ? bankName : cardCompanyName}</Table.Cell>
        <Table.Cell>{isAccount ? accountNumber : maskCardNumber(cardNumber)}</Table.Cell>
        {isUpdate && (
          <>
            <svg
              onClick={() => handlePaymentDelete(paymentMethodId, currentPage)}
              style={{ position: 'absolute', top: '50%', right: 8, transform: 'translate(-50%, -50%)' }}
              className='ml-2 w-5 icon cursor-pointer'
              viewBox='0 0 48 48'
              xmlns='http://www.w3.org/2000/svg'
              fill='#000000'
            >
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <title>close</title>
                <g id='Layer_2' data-name='Layer 2'>
                  <g id='invisible_box' data-name='invisible box'>
                    <rect width='48' height='48' fill='none'></rect>
                  </g>
                  <g id='icons_Q2' data-name='icons Q2'>
                    <path d='M26.8,24,37.4,13.5a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L24,21.2,13.4,10.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7L21.2,24,10.6,34.5a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L24,26.8,34.6,37.4a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7Z'></path>
                  </g>
                </g>
              </g>
            </svg>
          </>
        )}
      </Table.Row>
    </>
  );
};

export default MemberPaymentTableRow;
