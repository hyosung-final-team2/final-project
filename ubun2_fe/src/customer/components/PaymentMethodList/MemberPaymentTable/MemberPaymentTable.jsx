import { Table } from 'flowbite-react';
import { tableColumn } from '../../common/Table/tableIndex';
import TableBody from '../../common/Table/TableBody';
import MemberPaymentTableRow from './MemberPaymentTableRow';
import TableHead from '../../common/Table/TableHead';

const MemberPaymentTable = ({ payments, title }) => {
  return (
    <div className='p-2'>
      <h1 className='text-2xl font-bold mb-3 text-main'>{title}</h1>
      <Table hoverable>
        <TableHead tableColumns={tableColumn.paymentMethod.detail} isCheckable={false} />
        <TableBody users={payments} TableRowComponent={MemberPaymentTableRow} isCheckable={false} />
      </Table>
    </div>
  );
};

export default MemberPaymentTable;
