import { Table } from 'flowbite-react';

import MemberAddressTableRow from './MemberAddressTableRow';
import { tableColumn } from '../../common/Table/tableIndex.js';
import TableBody from '../../common/Table/TableBody.jsx';
import TableHead from '../../common/Table/TableHead.jsx';
import { useEffect, useState } from 'react';
import TablePagination from '../../common/Pagination/TablePagination.jsx';

const MemberAddressTable = ({ memberAddresses, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(memberAddresses.length / itemsPerPage);

  console.log(memberAddresses);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = memberAddresses.slice(startIndex, endIndex).map((item, index) => {
      const [addressNum, addressFirst, addressSecond, ...addressThird] = item.address.split(',');

      return {
        addressId: item.addressId,
        number: startIndex + index + 1,
        addressNum,
        addressFirst,
        addressSecond,
        addressThird,
      };
    });
    setPaginatedData(currentData);
  }, [currentPage, memberAddresses]);

  return (
    <div className='p-3'>
      <h2 className='text-2xl font-bold mb-3 text-main'>{title}</h2>
      <Table hoverable>
        <TableHead tableColumns={tableColumn.address.detail} isCheckable={false} />
        <TableBody users={paginatedData} TableRowComponent={MemberAddressTableRow} isCheckable={false} />
      </Table>
      {totalPages < 1 ? null : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {!memberAddresses?.length ? (
        <>
          <div className='flex justify-center items-center mx-3 py-16 bg-gray-100 rounded-lg'>
            <h1>등록된 주소지가 없습니다.</h1>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MemberAddressTable;
