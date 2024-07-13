import { CreditCardIcon, CurrencyDollarIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid';
import { Checkbox, Table } from 'flowbite-react';
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
        {orderStatus === 'APPROVED' ? (
          <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='승인' />
        ) : orderStatus === 'MODIFIED' ? (
          <StatusBadge bgColor='bg-badge-orange' txtColor='text-badge-orange' badgeText='변경' />
        ) : (
          <StatusBadge bgColor='bg-badge-red' txtColor='text-badge-red' badgeText='취소' />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderTableRow;
