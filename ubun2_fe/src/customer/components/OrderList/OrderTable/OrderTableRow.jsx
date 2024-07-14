import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import { Checkbox, Table } from 'flowbite-react';
import SingleIcon from '../../../../assets/images/single.svg';
import SubscriptionIcon from '../../../../assets/images/subscription.svg';
import { formatCurrency } from '../../../utils/currencyFormat';
import { formatDate } from '../../../utils/dateFormat';
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
        {subscription ? <OrderOptionBadge icon={SubscriptionIcon} orderOptionText='정기' /> : <OrderOptionBadge icon={SingleIcon} orderOptionText='단건' />}
      </Table.Cell>
      <Table.Cell>{formatDate(createdAt)}</Table.Cell>
      <Table.Cell>{memberName}</Table.Cell>
      <Table.Cell>{`${formatCurrency(totalOrderPrice)} 원`}</Table.Cell>
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
