import { Table, Checkbox } from 'flowbite-react';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../common/Badge/PaymentMethodBadge';
import { maskCardNumber } from '../../utils/cardFormat';
import { maskAccountNumber } from '../../utils/accountFormat';

const PaymentMethodTableRow = ({
  paymentMethodId,
  memberId,
  memberName,
  memberEmail,
  bankName,
  cardCompanyName,
  cardNumber,
  accountNumber,
  createdAt,
  setOpenModal,
  isChecked,
  handleRowChecked,
}) => {
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);

  const isAccount = paymentMethodType === 'ACCOUNT';
  const payment = {
    memberName,
    cardCompany: cardCompanyName,
    cardNumber,
    bankName,
    accountNumber,
    createdAt,
  };

  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(paymentMethodId, memberId, payment)}>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
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

export default PaymentMethodTableRow;
