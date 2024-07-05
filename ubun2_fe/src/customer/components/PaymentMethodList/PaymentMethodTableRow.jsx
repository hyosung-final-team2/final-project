import { Table, Checkbox } from 'flowbite-react';
import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import PaymentMethodBadge from '../common/Badge/PaymentMethodBadge';

const PaymentMethodTableRow = ({ name, email, method, company, paymentNumber, setOpenModal, isChecked, handleRowChecked }) => {
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Table.Row className='bg-white' onClick={handleClick}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>
          {paymentMethodType === 'CARD' ? (
            <PaymentMethodBadge icon={CreditCardIcon} paymentText='카드' />
          ) : (
            <PaymentMethodBadge icon={CurrencyDollarIcon} paymentText='계좌' />
          )}
        </Table.Cell>
        <Table.Cell>{company}</Table.Cell>
        <Table.Cell>{paymentNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default PaymentMethodTableRow;
