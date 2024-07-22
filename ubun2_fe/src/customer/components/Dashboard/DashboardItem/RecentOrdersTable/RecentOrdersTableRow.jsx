import React from 'react';
import { Table } from 'flowbite-react';

const RecentOrderTableRow = ({ id, date, customer, items, total, status }) => {
  return (
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 cursor-pointer'>
      <Table.Cell className='py-2 text-sm'>{date}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{customer}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{items}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>{total}</Table.Cell>
      <Table.Cell className='py-2 text-sm'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${status === '배송 완료' ? 'bg-green-100 text-green-800' : status === '배송 중' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}
        >
          {status}
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default RecentOrderTableRow;
