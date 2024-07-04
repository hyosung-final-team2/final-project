import { Table } from 'flowbite-react';
import { tableColumn } from '../../common/Table/tableIndex';
import TableBody from '../../common/Table/TableBody';
import MemberAddressTableRow from './MemberAddressTableRow';
import TableHead from '../../common/Table/TableHead';

const MemberAddressTable = ({ addresses, title }) => {
  return (
    <div className='p-3'>
      <h2 className='text-2xl font-bold mb-3 text-main'>{title}</h2>
      <Table hoverable>
        <TableHead tableColumns={tableColumn.address.detail} isCheckable={false} />
        <TableBody users={addresses} TableRowComponent={MemberAddressTableRow} isCheckable={false} />
      </Table>
    </div>
  );
};

export default MemberAddressTable;
