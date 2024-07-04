import { Table } from 'flowbite-react';

import MemberAddressTableHead from './MemberAddressTableHead';
import MemberAddressTableBody from './MemberAddressTableBody';
import TablePagination from '../../../common/Pagination/TablePagination';

const MemberAddressTable = () => {
  let totalPages = 3;
  return (
    <div className='p-3'>
      <h2 className='text-xl font-bold mb-3 text-main'>주소</h2>
      <Table striped>
        <MemberAddressTableHead />
        <MemberAddressTableBody />
      </Table>
      {totalPages === 1 ? null : <TablePagination totalPages={totalPages} />}
    </div>
  );
};

export default MemberAddressTable;
