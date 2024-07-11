import { Table } from 'flowbite-react';

import MemberPaymentTableRow from './MemberPaymentTableRow';
import { tableColumn } from '../../../common/Table/tableIndex.js';
import TableHead from '../../../common/Table/TableHead.jsx';
import TableBody from '../../../common/Table/TableBody.jsx';
import { useEffect, useState } from 'react';
import TablePagination from '../../../common/Pagination/TablePagination.jsx';

const MemberPaymentTable = ({ memberPaymentMethods, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(memberPaymentMethods.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = memberPaymentMethods.slice(startIndex, endIndex).map((item, index) => {
      const paymentMethodType = item.bankName ? 'ACCOUNT' : 'CARD';
      const paymentInstitution = item.bankName ? item.bankName : item.cardCompanyName;
      const paymentNumber = item.bankName ? item.accountNumber : item.cardNumber;

      return {
        paymentMethodId: item.paymentMethodId,
        number: startIndex + index + 1,
        paymentMethodType,
        paymentInstitution,
        paymentNumber,
      };
    });
    setPaginatedData(currentData);
  }, [currentPage, memberPaymentMethods]);

  return (
    <div className='p-2'>
      <h1 className='text-2xl font-bold mb-3 text-main'>{title}</h1>
      <Table hoverable>
        <TableHead tableColumns={tableColumn.paymentMethod.detail} isCheckable={false} />
        <TableBody users={paginatedData} TableRowComponent={MemberPaymentTableRow} isCheckable={false} />
      </Table>
      {totalPages < 1 ? null : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default MemberPaymentTable;
