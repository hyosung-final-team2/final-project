import { Table } from 'flowbite-react';
import MemberPaymentTableRow from './MemberPaymentTableRow';

const MemberPaymentTableBody = ({paymentMethods}) => {

  return (
    <Table.Body className='divide-y'>
      {paymentMethods.map(payment => {
        return <MemberPaymentTableRow key={payment.paymentMethodId} {...payment} />;
      })}
    </Table.Body>
  );
};
export default MemberPaymentTableBody;
