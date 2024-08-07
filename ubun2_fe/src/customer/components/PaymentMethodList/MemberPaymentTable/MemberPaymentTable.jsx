import { Table } from 'flowbite-react';
import { tableColumn } from '../../common/Table/tableIndex';
import MemberPaymentTableRow from './MemberPaymentTableRow';
import TableHead from '../../common/Table/TableHead';
import { useState, useEffect } from 'react';
import TablePagination from '../../common/Pagination/TablePagination';
import TableBody from '../../common/Table/TableBody';

const MemberPaymentTable = ({ payments, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = payments.slice(startIndex, endIndex).map((item, index) => {
      return {
        paymentMethodId: item.paymentMethodId,
        number: startIndex + index + 1,
        accountNumber: item.accountNumber,
        bankName: item.bankName,
        cardCompanyName: item.cardCompanyName,
        cardNumber: item.cardNumber,
        paymentType: item.paymentType,
      };
    });
    setPaginatedData(currentData);
  }, [currentPage, payments]);

  return (
    <div className='p-2'>
      <h1 className='text-2xl font-bold mb-3 text-main'>{title}</h1>
      <Table hoverable>
        <TableHead tableColumns={tableColumn.paymentMethod.detail} isCheckable={false} nonSort={tableColumn.paymentMethod.detail} />
        <TableBody
          dataList={paginatedData}
          TableRowComponent={MemberPaymentTableRow}
          isCheckable={false}
          dynamicId='paymentMethodId'
          currentPage={currentPage}
        />
      </Table>
      {totalPages < 1 ? null : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {!payments?.length ? (
        <>
          <div className='flex justify-center items-center py-16 bg-gray-100 rounded-b-lg'>
            <h1>등록된 결제수단이 없습니다.</h1>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MemberPaymentTable;
