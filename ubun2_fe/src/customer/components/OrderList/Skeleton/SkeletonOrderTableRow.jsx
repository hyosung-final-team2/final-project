import { Checkbox, Table } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge.jsx';
import { formatDate } from '../../../utils/dateFormat.js';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge.jsx';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge.jsx';
import { formatCurrency } from '../../../utils/currencyFormat.js';

const SkeletonOrderTableRow = ({ orderId, createdAt, memberName, orderStatus, paymentType, subscription, totalOrderPrice }) => {
  return (
    <>
      {/*<Table.Row className='skeleton' >*/}
      <Table.Row className='bg-white'>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox />
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
    </>
  );
};
export default SkeletonOrderTableRow;
