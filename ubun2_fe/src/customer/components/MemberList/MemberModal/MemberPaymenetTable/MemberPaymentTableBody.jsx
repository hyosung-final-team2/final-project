import { Table } from 'flowbite-react';
import MemberPaymentTableRow from './MemberPaymentTableRow';

const MemberPaymentTableBody = () => {
  const paymentList = [
    { paymentId: 1, paymentNickname: '내카드', paymentInstitution: '현대카드', paymentMethod: '카드', paymentNumber: '1111-1111-1111-1111' },
    { paymentId: 2, paymentNickname: '내계좌', paymentInstitution: '국민은행', paymentMethod: '계좌', paymentNumber: '111-112-124456' },
  ];
  return (
    <Table.Body className='divide-y'>
      {paymentList.map(payment => {
        return <MemberPaymentTableRow key={payment.paymentId} {...payment} />;
      })}
    </Table.Body>
  );
};
export default MemberPaymentTableBody;
