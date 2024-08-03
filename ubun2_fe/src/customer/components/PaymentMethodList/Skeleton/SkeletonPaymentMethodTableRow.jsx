import { Checkbox, Table } from 'flowbite-react';
import { formatBankAccount } from '../../../utils/accountFormat';
import { maskCardNumber } from '../../../utils/cardFormat';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import usePaymentMethodTableStore from '../../../store/PaymentMethod/paymentMethodTableStore';

const SkeletonPaymentMethodTableRow = ({ memberName, memberEmail, bankName, cardCompanyName, cardNumber, accountNumber, createdAt, isEmpty, colNum }) => {
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);

  const isAccount = paymentMethodType === 'ACCOUNT';

  const { sort } = usePaymentMethodTableStore();

  const getColorForColumn = column => {
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  if (isEmpty) {
    return (
      <Table.Row className='cursor-default'>
        <Table.Cell colSpan={colNum + 1} className='text-center text-gray-500 bg-gray-50'>
          <span className='invisible'>없음</span>
        </Table.Cell>
      </Table.Row>
    );
  }

  const sortInstitute = isAccount ? 'bankName' : 'cardCompany';
  const sortNumber = isAccount ? 'accountNumber' : 'cardNumber';
  return (
    <>
      <Table.Row className='bg-white h-[60px]'>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox />
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
          {isAccount ? formatBankAccount(bankName?.slice(0, -2), accountNumber, true) : maskCardNumber(cardNumber)}
        </Table.Cell>
      </Table.Row>
    </>
  );
};
export default SkeletonPaymentMethodTableRow;
