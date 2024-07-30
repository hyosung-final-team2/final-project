import React from 'react';
import { Table } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const RecentOrderTableRow = ({ id, createdAt, memberName, orderProducts, subscriptionOrderProducts, totalOrderPrice, orderStatus }) => {
  const date = createdAt?.split('T')[0];
  let items = '상품 없음';
  if (orderProducts && orderProducts.length > 0) {
    items = orderProducts[0].productName + (orderProducts.length === 1 ? '' : ` 외 ${orderProducts.length - 1} 건`);
  } else if (subscriptionOrderProducts && subscriptionOrderProducts.length > 0) {
    items = subscriptionOrderProducts[0].productName + (subscriptionOrderProducts.length === 1 ? '' : ` 외 ${subscriptionOrderProducts.length - 1} 건`);
  }
  const navigate = useNavigate();

  const handleOnclick = () => {
    orderStatus === 'APPROVED' ? navigate('/customer/app/order') : navigate('/customer/app/pendingorder');
  };
  return (
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 cursor-pointer' onClick={handleOnclick}>
      <Table.Cell className='py-2 text-sm'>{date}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{memberName}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{items}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{totalOrderPrice}원</Table.Cell>
      <Table.Cell className='py-2 text-sm'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${orderStatus === 'APPROVED' ? 'bg-badge-green text-white' : orderStatus === 'PENDING' ? 'bg-badge-orange text-white' : 'bg-badge-red text-white'}`}
        >
          {orderStatus === 'APPROVED' ? '승인' : orderStatus === 'PENDING' ? '대기' : '거절'}
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default RecentOrderTableRow;
