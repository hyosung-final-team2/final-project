import MemberPaymentTable from './MemberPaymentTable.jsx'

const PaymentRegisterTable = ({memberPaymentMethods}) => {

  return (
    <>
      <MemberPaymentTable memberPaymentMethods={memberPaymentMethods} title='결제수단 목록' />
    </>
  );
};

export default PaymentRegisterTable;
