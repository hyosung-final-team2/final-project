import { Table } from 'flowbite-react';

import MemberAddressTableHead from './MemberAddressTableHead';
import MemberAddressTableBody from './MemberAddressTableBody';
import TablePagination from '../../../common/Pagination/TablePagination';
import {useEffect, useState} from "react";

const MemberAddressTable = ({memberAddresses}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(memberAddresses.length / itemsPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = memberAddresses.slice(startIndex, endIndex).map((item, index) => {
            const [addressNum, addressFirst, addressSecond, addressThird] = item.address.split(',');

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
      <h2 className='text-xl font-bold mb-3 text-main'>주소</h2>
      <Table striped>
        <MemberAddressTableHead />
        <MemberAddressTableBody paginatedData={paginatedData}/>
      </Table>
      {totalPages < 1 ? null : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default MemberAddressTable;
