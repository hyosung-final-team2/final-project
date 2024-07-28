import { Checkbox, Table } from 'flowbite-react';
import { maskAccountNumber } from '../../../utils/accountFormat';
import { maskCardNumber } from '../../../utils/cardFormat';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';

const SkeletonPaymentMethodTableRow = ({ memberName, memberEmail, bankName, cardCompanyName, cardNumber, accountNumber, createdAt }) => {
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);

  const isAccount = paymentMethodType === 'ACCOUNT';

  return (
    <>
      <Table.Row className='bg-white'>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox />
        </Table.Cell>
        <Table.Cell style={{ width: '25%' }}>{memberEmail}</Table.Cell>
        <Table.Cell style={{ width: '15%' }}>{memberName}</Table.Cell>
        <Table.Cell style={{ width: '15%' }}>
          {isAccount ? <PaymentMethodBadge paymentType={paymentMethodType} /> : <PaymentMethodBadge paymentType={paymentMethodType} />}
        </Table.Cell>
        <Table.Cell style={{ width: '20%' }}>{isAccount ? bankName : cardCompanyName}</Table.Cell>
        <Table.Cell style={{ width: '20%' }}>{isAccount ? maskAccountNumber(accountNumber) : maskCardNumber(cardNumber)}</Table.Cell>
      </Table.Row>
    </>
  );
};
export default SkeletonPaymentMethodTableRow;
