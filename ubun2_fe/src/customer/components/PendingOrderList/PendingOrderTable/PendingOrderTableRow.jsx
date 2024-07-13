import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import IconButton from '../../common/Button/IconButton';
import { CheckIcon, CreditCardIcon, CurrencyDollarIcon, UserIcon, UsersIcon, XMarkIcon } from '@heroicons/react/16/solid';

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
        {subscription ? <OrderOptionBadge icon={UsersIcon} orderOptionText='정기' /> : <OrderOptionBadge icon={UserIcon} orderOptionText='단건' />}
      </Table.Cell>
      <Table.Cell>{orderId}</Table.Cell>
      <Table.Cell>{createdAt}</Table.Cell>
      <Table.Cell>{memberName}</Table.Cell>
      <Table.Cell>{totalOrderPrice}</Table.Cell>
      <Table.Cell>
        {paymentType === 'CARD' ? (
          <PaymentMethodBadge icon={CreditCardIcon} paymentText='카드' />
        ) : (
          <PaymentMethodBadge icon={CurrencyDollarIcon} paymentText='계좌' />
        )}
      </Table.Cell>
      <Table.Cell>
        <div className='flex gap-2'>
          <IconButton IconComponent={CheckIcon} onClickBtn={handleApprove} btnColor='success' />
          <IconButton IconComponent={XMarkIcon} onClickBtn={handleCancel} btnColor='failure' />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default PendingOrderTableRow;
