import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import IconButton from '../../common/Button/IconButton';
import { CheckIcon, CreditCardIcon, CurrencyDollarIcon, UserIcon, UsersIcon, XMarkIcon } from '@heroicons/react/16/solid';

const PendingOrderTableRow = ({
  id,
  orderCreatedAt,
  orderMemberId,
  totalOrderPrice,
  orderPaymentMethod,
  orderStatus,
  orderOption,
  setOpenModal,
  isChecked,
  handleRowChecked,
  orderApprove,
  orderCancel,
}) => {
  return (
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' onClick={() => setOpenModal(true)}>
      <Table.Cell>
        <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
      </Table.Cell>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{orderCreatedAt}</Table.Cell>
      <Table.Cell>{orderMemberId}</Table.Cell>
      <Table.Cell>{totalOrderPrice}</Table.Cell>
      <Table.Cell>
        {orderPaymentMethod === 'CARD' ? (
          <PaymentMethodBadge icon={CreditCardIcon} paymentText='카드' />
        ) : (
          <PaymentMethodBadge icon={CurrencyDollarIcon} paymentText='계좌' />
        )}
      </Table.Cell>
      <Table.Cell>
        {orderOption === 'SINGLE' ? <OrderOptionBadge icon={UserIcon} orderOptionText='단건' /> : <OrderOptionBadge icon={UsersIcon} orderOptionText='정기' />}
      </Table.Cell>
      <Table.Cell>
        <div className='flex gap-2'>
          <IconButton IconComponent={CheckIcon} onClickBtn={e => orderApprove(e, id)} btnColor='success' />
          <IconButton IconComponent={XMarkIcon} onClickBtn={e => orderCancel(e, id)} btnColor='failure' />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default PendingOrderTableRow;
