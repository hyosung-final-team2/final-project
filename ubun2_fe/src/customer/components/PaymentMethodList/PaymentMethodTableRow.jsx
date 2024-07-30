import { Table, Checkbox } from 'flowbite-react';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../common/Badge/PaymentMethodBadge';
import { maskCardNumber } from '../../utils/cardFormat';
import { maskAccountNumber } from '../../utils/accountFormat';
import usePaymentMethodTableStore from '../../store/PaymentMethod/paymentMethodTableStore';
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

  const { sort } = usePaymentMethodTableStore();

  const getColorForColumn = column => {
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  const isAccount = paymentMethodType === 'ACCOUNT';
  const payment = {
    memberName,
    cardCompany: cardCompanyName,
    cardNumber,
    bankName,
    accountNumber,
    createdAt,
  };

  const sortInstitute = isAccount ? 'bankName' : 'cardCompany';
  const sortNumber = isAccount ? 'accountNumber' : 'cardNumber';
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(paymentMethodId, memberId, payment)}>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell className={getColorForColumn('memberEmail')} style={{ width: '25%' }}>
          {memberEmail}
        </Table.Cell>
        <Table.Cell className={getColorForColumn('memberName')} style={{ width: '15%' }}>
          {memberName}
        </Table.Cell>
        <Table.Cell style={{ width: '15%' }}>
          {isAccount ? <PaymentMethodBadge paymentType={paymentMethodType} /> : <PaymentMethodBadge paymentType={paymentMethodType} />}
        </Table.Cell>
        <Table.Cell className={getColorForColumn(sortInstitute)} style={{ width: '20%' }}>
          {isAccount ? bankName : cardCompanyName}
        </Table.Cell>
        <Table.Cell className={getColorForColumn(sortNumber)} style={{ width: '20%' }}>
          {isAccount ? maskAccountNumber(accountNumber) : maskCardNumber(cardNumber)}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default PaymentMethodTableRow;
