import PaymentMethodTable from '../../components/PaymentMethodList/PaymentMethodTable';
import { payments } from '../../components/PaymentMethodList/PaymentMethodListData';
function PaymentList() {
  return (
    <>
      <PaymentMethodTable payments={payments} />
    </>
  );
}

export default PaymentList;
