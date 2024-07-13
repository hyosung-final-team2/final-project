import { Table, Checkbox } from 'flowbite-react';
import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../common/Badge/PaymentMethodBadge';

const PaymentMethodTableRow = ({
  paymentMethodId,
  memberId,
  memberName,
  memberEmail,
  bankName,
  cardCompanyName,
  cardNumber,
  accountNumber,
  setOpenModal,
  isChecked,
  handleRowChecked,
}) => {
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);

  const isAccount = paymentMethodType === 'ACCOUNT';
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(paymentMethodId, memberId)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{memberEmail}</Table.Cell>
        <Table.Cell>{memberName}</Table.Cell>
        <Table.Cell>
          {isAccount ? <PaymentMethodBadge icon={CurrencyDollarIcon} paymentText='계좌' /> : <PaymentMethodBadge icon={CreditCardIcon} paymentText='카드' />}
        </Table.Cell>
        <Table.Cell>{isAccount ? bankName : cardCompanyName}</Table.Cell>
        <Table.Cell>{isAccount ? accountNumber : cardNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default PaymentMethodTableRow;
