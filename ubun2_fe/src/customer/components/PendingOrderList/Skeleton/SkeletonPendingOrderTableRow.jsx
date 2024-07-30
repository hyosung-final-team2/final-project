import { Checkbox, Table } from 'flowbite-react';
import { formatDate } from '../../../utils/dateFormat.js';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge.jsx';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge.jsx';
import { formatCurrency } from '../../../utils/currencyFormat.js';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import useOrderTableStore from "../../../store/OrderTable/orderTableStore.js";

const commonButtonStyles = {
  APPROVED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-green bg-opacity-30 text-badge-green hover:text-white hover:bg-badge-green',
  DENIED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-red bg-opacity-30 text-badge-red hover:text-white hover:bg-badge-red',
};

const SkeletonPendingOrderTableRow = ({ orderId, createdAt, memberName, orderStatus, paymentType, subscription, totalOrderPrice }) => {
    const { sort } = useOrderTableStore();

    const getColorForColumn = (column) => {
        if (column === 'orderStatus') {
            return '';
        }
        const sortItem = sort.find(item => item.startsWith(`${column},`));
        if (sortItem) {
            return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
        }
        return '';
    };

    return (
    <Table.Row className='bg-white'>
      <Table.Cell style={{ width: '5%' }}>
        <Checkbox />
      </Table.Cell>
      <Table.Cell className={getColorForColumn('isSubscription')}  style={{ width: '10%' }}>
        <OrderOptionBadge subscription={subscription} />
      </Table.Cell>
      <Table.Cell className={getColorForColumn('createdAt')} style={{ width: '15%' }}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
      <Table.Cell className={getColorForColumn('memberName')} style={{ width: '15%' }}>{memberName}</Table.Cell>
      <Table.Cell className={getColorForColumn('totalCost')} style={{ width: '20%' }}>{`${totalOrderPrice ? formatCurrency(totalOrderPrice) : '-'} 원`}</Table.Cell>
      <Table.Cell className={getColorForColumn('paymentType')} style={{ width: '15%' }}>
        <PaymentMethodBadge paymentType={paymentType} />
      </Table.Cell>
      <Table.Cell style={{ width: '20%' }}>
        <div className='flex gap-2'>
          <button className={`${commonButtonStyles.APPROVED}`}>
            <CheckIcon className='w-4' />
          </button>
          <button className={`${commonButtonStyles.DENIED}`}>
            <XMarkIcon className='w-4' />
          </button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
export default SkeletonPendingOrderTableRow;
