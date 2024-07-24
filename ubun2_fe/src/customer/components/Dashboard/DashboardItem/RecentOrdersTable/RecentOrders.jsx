import React from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../../common/Table/TableHead';
import DynamicTableBody from '../../../common/Table/DynamicTableBody';
import RecentOrderTableRow from './RecentOrdersTableRow';

const RecentOrdersTable = ({ ordersByDateValue }) => {
  const tableColumns = ['날짜', '고객명', '주문 내역', '총액', '상태'];

  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-2 flex flex-col'>
      <h2 className='text-lg font-bold mb-4'>최근 주문 목록</h2>
      <div className='overflow-x-auto flex-grow'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden h-30'>
            <Table className='min-w-full divide-y divide-gray-200'>
              <TableHead tableColumns={tableColumns} isCheckable={false} />
              <DynamicTableBody dataList={ordersByDateValue} TableRowComponent={RecentOrderTableRow} dynamicKey='orderId' dynamicId='id' isCheckable={false} />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
