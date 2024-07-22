import React from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../../common/Table/TableHead';
import DynamicTableBody from '../../../common/Table/DynamicTableBody';
import RecentOrderTableRow from './RecentOrdersTableRow';

const RecentOrdersTable = () => {
  // 예시 데이터: 실제 데이터로 대체해야 합니다
  const recentOrders = [
    { date: '2024-07-20', customer: '김철수', items: '김치 외 2건', total: '45,000원', status: '배송 중' },
    { date: '2024-07-20', customer: '이영희', items: '우유 외 1건', total: '23,000원', status: '주문 확인' },
    { date: '2024-07-19', customer: '박지성', items: '치즈 외 3건', total: '67,000원', status: '배송 완료' },
    { date: '2024-07-19', customer: '박지성', items: '치즈 외 3건', total: '67,000원', status: '배송 완료' },
  ];

  const tableColumns = ['날짜', '고객명', '주문 내역', '총액', '상태'];

  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-2 flex flex-col'>
      <h2 className='text-lg font-bold mb-4'>최근 주문 목록</h2>
      <div className='overflow-x-auto flex-grow'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden h-30'>
            <Table className='min-w-full divide-y divide-gray-200'>
              <TableHead tableColumns={tableColumns} isCheckable={false} />
              <DynamicTableBody dataList={recentOrders} TableRowComponent={RecentOrderTableRow} dynamicKey='id' dynamicId='id' isCheckable={false} />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
