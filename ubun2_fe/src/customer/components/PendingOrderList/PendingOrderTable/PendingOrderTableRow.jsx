import { useState } from 'react';
import { Checkbox, Table } from 'flowbite-react';
import OrderOptionBadge from '../../common/Badge/OrderOptionBadge';
import PaymentMethodBadge from '../../common/Badge/PaymentMethodBadge';
import IconButton from '../../common/Button/IconButton';
import { CheckIcon, CreditCardIcon, CurrencyDollarIcon, UserGroupIcon, UserIcon, UsersIcon, XMarkIcon } from '@heroicons/react/16/solid';

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
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    subMessage: '',
  });

  const orderApprove = () => {
    // TODO: 회원의 주문 요청 승인 API
    setAlertMessage({
      message: '승인처리 완료',
      subMessage: '승인처리가 완료되었습니다.',
    });
    setShowAlert(true);
  };

  const orderCancel = () => {
    // TODO: 회원의 주문 요청 취소(거절) API
    setAlertMessage({
      message: '취소처리 완료',
      subMessage: '취소처리가 완료되었습니다.',
    });
    setShowAlert(true);
  };

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
        {orderOption === 'SINGLE' ? (
          <OrderOptionBadge icon={UserIcon} orderOptionText='단건' />
        ) : orderOption === 'SUBSCRIPTION' ? (
          <OrderOptionBadge icon={UsersIcon} orderOptionText='정기' />
        ) : (
          <OrderOptionBadge icon={UserGroupIcon} orderOptionText='단건 & 정기' />
        )}
      </Table.Cell>
      <Table.Cell onClick={e => e.stopPropagation()}>
        <div className='flex gap-2'>
          <IconButton IconComponent={CheckIcon} onClickBtn={orderApprove} btnColor='success' />
          <IconButton IconComponent={XMarkIcon} onClickBtn={orderCancel} btnColor='failure' />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default PendingOrderTableRow;
