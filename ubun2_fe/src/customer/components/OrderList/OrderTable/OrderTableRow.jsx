import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import { Checkbox, Table } from 'flowbite-react';
import { formatCurrency } from '../../../utils/currencyFormat';
import { formatDate } from '../../../utils/dateFormat';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import StatusBadge from '../../common/Badge/StatusBadge';

const OrderTableRow = ({
  orderId,
  createdAt,
  memberName,
  orderStatus,
  paymentType,
  subscription,
  totalOrderPrice,
  setOpenModal,
  isChecked,
  handleRowChecked,
}) => {
  return (
    <Table.Row className='bg-white' onClick={() => setOpenModal(orderId, subscription)}>
      <Table.Cell>
        <Checkbox checked={isChecked} onChange={() => handleRowChecked(orderId, subscription)} onClick={e => e.stopPropagation()} />
      </Table.Cell>
      <Table.Cell>
        <OrderOptionBadge subscription={subscription} />
      </Table.Cell>
      <Table.Cell>{formatDate(createdAt)}</Table.Cell>
      <Table.Cell>{memberName}</Table.Cell>
      <Table.Cell>{`${formatCurrency(totalOrderPrice)} 원`}</Table.Cell>
      <Table.Cell>
        <PaymentMethodBadge paymentType={paymentType} />
      </Table.Cell>
      <Table.Cell>
        <StatusBadge status={orderStatus} />
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderTableRow;
