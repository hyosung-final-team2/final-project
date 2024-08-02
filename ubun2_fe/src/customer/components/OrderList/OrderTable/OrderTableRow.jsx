import { Checkbox, Table } from 'flowbite-react';
import { formatCurrency } from '../../../utils/currencyFormat';
import { formatDate } from '../../../utils/dateFormat';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';
import useOrderTableStore from '../../../store/OrderTable/orderTableStore.js';

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
  isEmpty,
  colNum,
}) => {
  const { sort } = useOrderTableStore();

  const getColorForColumn = column => {
    if (column === 'orderStatus') {
      return '';
    }
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
          <StatusBadge status={'EMPTY'} />
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table.Row className='bg-white' onClick={() => setOpenModal(orderId, subscription, currentPage)}>
      <Table.Cell className={getColorForColumn('isSubscription')} style={{ width: '15%' }}>
        <OrderOptionBadge subscription={subscription} />
      </Table.Cell>
      <Table.Cell className={getColorForColumn('createdAt')} style={{ width: '20%' }}>
        {createdAt ? formatDate(createdAt) : null}
      </Table.Cell>
      <Table.Cell className={getColorForColumn('memberName')} style={{ width: '15%' }}>
        {memberName}
      </Table.Cell>
      <Table.Cell className={getColorForColumn('totalCost')} style={{ width: '20%' }}>{`${
        totalOrderPrice ? formatCurrency(totalOrderPrice) : '-'
      } 원`}</Table.Cell>
      <Table.Cell className={getColorForColumn('paymentType')} style={{ width: '15%' }}>
        <PaymentMethodBadge paymentType={paymentType} />
      </Table.Cell>
      <Table.Cell style={{ width: '15%' }}>
        <StatusBadge status={orderStatus} />
      </Table.Cell>
    </Table.Row>
  );
};

export default memo(OrderTableRow);
