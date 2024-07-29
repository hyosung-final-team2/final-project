import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import { formatDate } from '../../../utils/dateFormat';
import { formatCurrency } from '../../../utils/currencyFormat';
import {useSendPersonalAlarm} from "../../../api/notification/queris.js";

const commonButtonStyles = {
  APPROVED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-green bg-opacity-30 text-badge-green hover:text-white hover:bg-badge-green',
  DENIED:
    'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-red bg-opacity-30 text-badge-red hover:text-white hover:bg-badge-red',
};

const PendingOrderTableRow = ({
  orderId,
  createdAt,
  memberId,
  memberName,
  paymentType,
  subscription,
  totalOrderPrice,
  setOpenModal,
  isChecked,
  handleRowChecked,
  handleOrderUpdate,
  currentPage,
}) => {

  const { mutate:sendPersonalAlarmMutate } = useSendPersonalAlarm(memberId,orderId,subscription)

  const handleApprove = e => {
    e.stopPropagation();
    handleOrderUpdate([{ orderId, subscription }], 'APPROVED');
    sendPersonalAlarmMutate(true)
  };

  const handleCancel = e => {
    e.stopPropagation();
    handleOrderUpdate([{ orderId, subscription }], 'DENIED');
    sendPersonalAlarmMutate(false)
  };

  return (
    <Table.Row className='bg-white' onClick={() => setOpenModal(orderId, subscription, currentPage)}>
      <Table.Cell style={{ width: '5%' }}>
        <Checkbox checked={isChecked} onChange={() => handleRowChecked(orderId, subscription)} onClick={e => e.stopPropagation()} />
      </Table.Cell>
      <Table.Cell style={{ width: '10%' }}>
        <OrderOptionBadge subscription={subscription} />
      </Table.Cell>
      <Table.Cell style={{ width: '15%' }}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
      <Table.Cell style={{ width: '15%' }}>{memberName}</Table.Cell>
      <Table.Cell style={{ width: '20%' }}>{`${totalOrderPrice ? formatCurrency(totalOrderPrice) : '-'} 원`}</Table.Cell>
      <Table.Cell style={{ width: '15%' }}>
        <PaymentMethodBadge paymentType={paymentType} />
      </Table.Cell>
      <Table.Cell style={{ width: '20%' }}>
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
