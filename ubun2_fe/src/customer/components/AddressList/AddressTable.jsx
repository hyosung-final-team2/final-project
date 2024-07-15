import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import TablePagination from '../common/Pagination/TablePagination';
import AddressTableFeature from './AddressTableFeature';
import AddressTableRow from './AddressTableRow';
import MemberAddressModal from './MemberAddressModal';

import { useQueryClient } from '@tanstack/react-query';
import { useGetAddresses } from '../../api/Address/AddressTable/queris.js';
import { useGetAddressDetail } from '../../api/Address/AddressModal/queris.js';
import { getAddresses } from '../../api/Address/AddressTable/addressTable.js';

import useAddressStore from '../../store/Address/useAddressStore.js';
import DynamicTableBody from '../common/Table/DynamicTableBody.jsx';
import AddressRegistrationModal from './AddressRegistrationModal.jsx';

const AddressTable = () => {
  const [openMemberAddressModal, setOpenMemberAddressModal] = useState(false);
  const [openAddressRegistration, setOpenAddressRegistration] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState([]); // 체크된 멤버 ID
  const [addressId, setAddressId] = useState(null);
  const { setSelectedMemberId } = useAddressStore();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: addresses } = useGetAddresses(currentPage);

  const totalPages = addresses?.data?.data?.totalPages ?? 5;
  const addressList = addresses?.data?.data?.content || [];

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['address', { page: nextPage }],
        queryFn: () => getAddresses(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

  //
  const { refetch } = useGetAddressDetail(addressId);
  //

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedAddresses(addressList.map(address => address.addressId));
    } else {
      setSelectedAddresses([]);
    }
  };

  const handleRowChecked = id => {
    setSelectedAddresses(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  const handleRowClick = async (addressId, memberId) => {
    await setAddressId(addressId);
    await refetch();
    await setOpenMemberAddressModal(true);
    setSelectedMemberId(memberId);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <AddressTableFeature setOpenModal={setOpenAddressRegistration} />
      <div className='px-4'>
        <Table hoverable>
          <TableHead tableColumns={tableColumn.address.list} allChecked={selectedAddresses.length === addressList.length} setAllChecked={handleAllChecked} />
          <DynamicTableBody
            TableRowComponent={AddressTableRow}
            dataList={addressList}
            setOpenModal={handleRowClick}
            dynamicKey='addressId'
            dynamicId='addressId'
            selectedMembers={selectedAddresses}
            handleRowChecked={handleRowChecked}
            currentPage={currentPage}
          />
        </Table>
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        <MemberAddressModal
          isOpen={openMemberAddressModal}
          setOpenModal={setOpenMemberAddressModal}
          addressId={addressId}
          setAddressId={setAddressId}
          currentPage={currentPage}
        />
        <AddressRegistrationModal isOpen={openAddressRegistration} setOpenModal={setOpenAddressRegistration} />
      </div>
    </div>
  );
};

export default AddressTable;
