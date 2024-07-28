import { Checkbox, Table } from 'flowbite-react';
import { formatCurrency } from '../../../utils/currencyFormat';
import { formatDate } from '../../../utils/dateFormat';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';

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
  currentPage,
}) => {
  return (
    <Table.Row className='bg-white' onClick={() => setOpenModal(orderId, subscription, currentPage)}>
      <Table.Cell style={{ width: '5%' }}>
        <Checkbox checked={isChecked} onChange={() => handleRowChecked(orderId, subscription)} onClick={e => e.stopPropagation()} />
      </Table.Cell>
      <Table.Cell style={{ width: '20%' }}>
        <OrderOptionBadge subscription={subscription} />
      </Table.Cell>
      <Table.Cell style={{ width: '20%' }}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
      <Table.Cell style={{ width: '15%' }}>{memberName}</Table.Cell>
      <Table.Cell style={{ width: '20%' }}>{`${totalOrderPrice ? formatCurrency(totalOrderPrice) : '-'} 원`}</Table.Cell>
      <Table.Cell style={{ width: '10%' }}>
        <PaymentMethodBadge paymentType={paymentType} />
      </Table.Cell>
      <Table.Cell style={{ width: '10%' }}>
        <StatusBadge status={orderStatus} />
      </Table.Cell>
    </Table.Row>
  );
};

export default memo(OrderTableRow);
