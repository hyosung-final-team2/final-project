import { Table } from 'flowbite-react';
import MemberPaymentTableHead from './MemberPaymentTableHead';
import MemberPaymentTableBody from './MemberPaymentTableBody';
import TablePagination from '../../../common/Pagination/TablePagination';

const MemberPaymentTable = () => {
  let totalPages = 1;
  return (
    <div className='p-3'>
      <h2 className='text-xl font-bold mb-3 text-main'>결제수단</h2>
      <Table striped>
        <MemberPaymentTableHead />
        <MemberPaymentTableBody />
      </Table>
      {totalPages === 1 ? null : <TablePagination totalPages={totalPages} />}
    </div>
  );
};

export default MemberPaymentTable;
