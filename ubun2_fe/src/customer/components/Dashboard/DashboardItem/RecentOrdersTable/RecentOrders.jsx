import React from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../../common/Table/TableHead';
import RecentOrderTableRow from './RecentOrdersTableRow';
import UnifiedOrdersTableBody from './UnifiedOrdersTableBody';

const RecentOrdersTable = ({ ordersByDateValue, daysBetween }) => {
  const tableColumns = ['날짜', '고객명', '주문 내역', '총액', '상태'];
  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-2 flex flex-col'>
      <h2 className='text-lg font-bold mb-4'>총 {daysBetween}일동안 주문 목록</h2>
      {ordersByDateValue === undefined || ordersByDateValue.length === 0 ? (
        <div className='bg-gray-100 h-full rounded-lg flex items-center justify-center'>주문 데이터가 없습니다</div>
      ) : (
        <div className='overflow-x-auto flex-grow'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden h-30'>
              <Table className='min-w-full divide-y divide-gray-200'>
                <TableHead tableColumns={tableColumns} isCheckable={false} nonSort={tableColumns} />
                <UnifiedOrdersTableBody
                  dataList={ordersByDateValue}
                  TableRowComponent={RecentOrderTableRow}
                  dynamicKey='orderId'
                  dynamicId='orderId'
                  isCheckable={false}
                />
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersTable;
