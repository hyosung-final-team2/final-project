import MemberPaymentTable from '../../../PaymentMethodList/MemberPaymentTable/MemberPaymentTable';

const PaymentRegisterTable = () => {
  const existingPaymentMethods = [
    { id: 1, type: '카드', company: '현대카드', number: '1111-****-****-4444', expiry: '24/08' },
    { id: 2, type: '계좌', company: '국민은행', number: '1002-***-***-004', expiry: '24/08' },
    { id: 3, type: '카드', company: '우리카드', number: '1111-****-****-4444', expiry: '24/08' },
  ];
  return (
    <>
      <MemberPaymentTable payments={existingPaymentMethods} title='결제수단 목록' />
    </>
  );
};

export default PaymentRegisterTable;
