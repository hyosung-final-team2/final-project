import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import StatusBadge from '../../common/Badge/StatusBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import { CreditCardIcon, CurrencyDollarIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid';

const OrderTableRow = ({
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
}) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(true)}>
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
          {orderOption === 'SINGLE' ? (
            <OrderOptionBadge icon={UserIcon} orderOptionText='단건' />
          ) : orderOption === 'SUBSCRIPTION' ? (
            <OrderOptionBadge icon={UsersIcon} orderOptionText='정기' />
          ) : (
            <OrderOptionBadge icon={UserGroupIcon} orderOptionText='단건 & 정기' />
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
    </>
  );
};

export default OrderTableRow;
