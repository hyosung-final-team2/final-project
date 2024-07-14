import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import { formatDate } from '../../../utils/dateFormat';
import { formatCurrency } from '../../../utils/currencyFormat';

const commonButtonStyles = {
  APPROVED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-green bg-opacity-30 text-badge-green hover:text-white hover:bg-badge-green',
  DENIED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-red bg-opacity-30 text-badge-red hover:text-white hover:bg-badge-red',
};

const PendingOrderTableRow = ({
  orderId,
  createdAt,
  memberName,
  paymentType,
  subscription,
  totalOrderPrice,
  setOpenModal,
  isChecked,
  handleRowChecked,
  handleOrderUpdate,
}) => {
  const handleApprove = e => {
    e.stopPropagation();
    handleOrderUpdate([{ orderId, subscription }], 'APPROVED');
  };

  const handleCancel = e => {
    e.stopPropagation();
    handleOrderUpdate([{ orderId, subscription }], 'DENIED');
  };

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
        <div className='flex gap-2'>
          <button onClick={handleApprove} className={`${commonButtonStyles.APPROVED}`}>
            <CheckIcon className='w-4' />
          </button>
          <button onClick={handleCancel} className={`${commonButtonStyles.DENIED}`}>
            <XMarkIcon className='w-4' />
          </button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default PendingOrderTableRow;
