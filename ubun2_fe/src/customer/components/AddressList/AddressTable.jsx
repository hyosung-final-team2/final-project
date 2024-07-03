import { useState } from 'react';
import { Table } from 'flowbite-react';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import TableBody from '../common/Table/TableBody';
import TablePagination from '../common/Pagination/TablePagination';
import AddressTableFeature from './AddressTableFeature';
import AddressTableRow from './AddressTableRow';
import MemberAddressModal from './MemberAddressModal';
const AddressTable = ({ addresses }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState([]); // 체크된 멤버 ID

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedAddresses(addresses.map(address => address.id));
    } else {
      setSelectedAddresses([]);
    }
  };

  const handleRowChecked = id => {
    setSelectedAddresses(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <AddressTableFeature />
      <div className='px-4'>
        <Table hoverable>
          <TableHead tableColumns={tableColumn.address.list} allChecked={selectedAddresses.length === addresses.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={addresses}
            TableRowComponent={AddressTableRow}
            setOpenModal={setOpenModal}
            selectedMembers={selectedAddresses}
            handleRowChecked={handleRowChecked}
          />
        </Table>
        <TablePagination totalPages={3} containerStyle='bg-white py-4' />
        <MemberAddressModal isOpen={openModal} setOpenModal={setOpenModal} />
      </div>
    </div>
  );
};

export default AddressTable;
