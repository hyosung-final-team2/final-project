import MemberPaymentTable from './MemberPaymentTable.jsx';

const PaymentRegisterTable = ({ memberPaymentMethods, isUpdate, handlePaymentMethodDelete }) => {
  return (
    <>
      <MemberPaymentTable
        memberPaymentMethods={memberPaymentMethods}
        title='결제수단 목록'
        isUpdate={isUpdate}
        handlePaymentMethodDelete={handlePaymentMethodDelete}
      />
    </>
  );
};

export default PaymentRegisterTable;
