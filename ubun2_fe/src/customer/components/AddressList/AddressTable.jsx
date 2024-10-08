import { useState, useEffect, useRef } from 'react';
import { Table } from 'flowbite-react';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import TablePagination from '../common/Pagination/TablePagination';
import AddressTableFeature from './AddressTableFeature';
import AddressTableRow from './AddressTableRow';
import MemberAddressModal from './MemberAddressModal';

import { useQueryClient } from '@tanstack/react-query';
import { useDeleteSelectedAddresses, useGetAddresses } from '../../api/Address/AddressTable/queris.js';
import { useGetAddressDetail } from '../../api/Address/AddressModal/queris.js';
import { getAddresses } from '../../api/Address/AddressTable/addressTable.js';

import useAddressStore from '../../store/Address/useAddressStore.js';
import AddressRegistrationModal from './AddressRegistrationModal.jsx';
import useAddressTableStore from '../../store/Address/addressTableStore.js';

import SkeletonTable from '../Skeleton/SkeletonTable.jsx';
import SkeletonAddressTableFeature from './Skeleton/SkeletonAddressTableFeature.jsx';
import SkeletonAddressTableRow from './Skeleton/SkeletonAddressTableRow.jsx';

import useSkeletonStore from '../../store/skeletonStore.js';
import NoDataTable from '../common/Table/NoDataTable.jsx';
import TableBody from '../common/Table/TableBody.jsx';

import DeleteConfirmModal from '../common/Modal/DeleteConfirmModal.jsx';
import AlertConfirmModal from '../common/Modal/AlertConfirmModal.jsx';

const AddressTable = () => {
  const [openAddressRegistration, setOpenAddressRegistration] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState([]); // 체크된 멤버 ID
  const [addressId, setAddressId] = useState(null);
  const [clickedAddress, setClickedAddress] = useState(null);
  const { setSelectedMemberId, openMemberAddressModal, setOpenMemberAddressModal } = useAddressStore();
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isAlertConfirmModalOpen, setIsAlertConfirmModalOpen] = useState(false);

  const { sort, updateSort, searchCategory, setSearchCategory, searchKeyword, setSearchKeyword, resetData, toggleIsReset, setTotalElements } =
    useAddressTableStore();

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const { data: addresses, refetch: refetchAddresses, isLoading } = useGetAddresses(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const totalPages = addresses?.data?.data?.totalPages;
  const totalElementsFromPage = addresses?.data?.data?.totalElements;
  const addressList = addresses?.data?.data?.content;

  const dropdownRef = useRef(null);

  const { mutate: deleteSelectedAddressesMutate } = useDeleteSelectedAddresses(selectedAddresses, currentPage, PAGE_SIZE);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['address', nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword],
        queryFn: () => getAddresses(nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword),
      });
    }
  }, [currentPage, queryClient, totalPages, sort, searchCategory, searchKeyword]);

  useEffect(() => {
    setSelectedAddresses([]);
  }, [currentPage, addressList]);

  useEffect(() => {
    if (totalElementsFromPage !== undefined) {
      setTotalElements(totalElementsFromPage);
    }
  }, [totalElementsFromPage, setTotalElements]);

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

  const handleRowChecked = (addressId, isChecked) => {
    setSelectedAddresses(prev => {
      if (isChecked) {
        return [...prev, addressId];
      } else {
        return prev.filter(id => id !== addressId);
      }
    });
  };

  const handleRowClick = async (addressId, memberId, clickedAddress) => {
    await setAddressId(addressId);
    await refetch();
    setOpenMemberAddressModal(true);
    await setClickedAddress(clickedAddress);
    setSelectedMemberId(memberId);
  };

  const handleSearch = (term, category) => {
    setSearchKeyword(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;
    refetchAddresses();
    setCurrentPage(1);
  };

  const handleSort = async (column, sortType) => {
    await updateSort(column, sortType);
    refetchAddresses();
    setCurrentPage(1);
  };

  const handleDataReset = async () => {
    await toggleIsReset();
    await resetData();
    await refetchAddresses();
    setCurrentPage(1);
  };

  const handleDropdownButtonClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
  };

  const NoDataTableButtonFunc = () => {
    setOpenAddressRegistration(true);
  };

  const deleteConfirmFirstButtonFunc = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const deleteConfirmSecondButtonFunc = () => {
    deleteSelectedAddressesMutate();
    setIsDeleteConfirmModalOpen(false);
  };
  const {
    setSkeletonData,
    setSkeletonTotalPage,
    setSkeletonSortData,
    setSkeletonSearchCategory,
    setSkeletonSearchKeyword,
    setSkeletonTotalElements,
    skeletonTotalElement,
  } = useSkeletonStore();

  useEffect(() => {
    return resetData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setSkeletonData(addressList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage);
      }
    }
  }, [
    addressList,
    totalPages,
    sort,
    searchKeyword,
    searchCategory,
    setSkeletonTotalPage,
    setSkeletonSortData,
    setSkeletonData,
    setSkeletonSearchCategory,
    setSkeletonSearchKeyword,
    isLoading,
  ]);

  if (isLoading) {
    return (
      <SkeletonTable
        SkeletonTableFeature={SkeletonAddressTableFeature}
        TableRowComponent={SkeletonAddressTableRow}
        tableColumns={tableColumn.address.list}
        nonSort={tableColumn.address.nonSort}
        PAGE_SIZE={PAGE_SIZE}
        colNum={tableColumn.address.list.length}
      />
    );
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <AddressTableFeature
        setOpenModal={setOpenAddressRegistration}
        tableColumns={tableColumn.address.search}
        onSearch={handleSearch}
        selectedAddresses={selectedAddresses}
        handleDataReset={handleDataReset}
        dropdownRef={dropdownRef}
        setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
        setIsAlertConfirmModalOpen={setIsAlertConfirmModalOpen}
      />
      <div className='px-4'>
        <Table hoverable>
          <TableHead
            tableColumns={tableColumn.address.list}
            headerType='address'
            allChecked={selectedAddresses.length === addressList?.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            nonSort={tableColumn.address.nonSort}
          />

          {addressList.length > 0 ? (
            <TableBody
              TableRowComponent={AddressTableRow}
              dataList={addressList}
              setOpenModal={handleRowClick}
              dynamicId='addressId'
              selectedMembers={selectedAddresses}
              handleRowChecked={handleRowChecked}
              currentPage={currentPage}
              PAGE_SIZE={PAGE_SIZE}
              colNum={tableColumn.address.list.length}
            />
          ) : (
            <NoDataTable
              text={searchCategory && searchKeyword ? '검색 결과가 없습니다!' : '등록된 주소가 없습니다.'}
              buttonText={searchCategory && searchKeyword ? '다시 검색하기' : '주소 등록하기'}
              buttonFunc={searchCategory && searchKeyword ? handleDropdownButtonClick : NoDataTableButtonFunc}
              colNum={tableColumn.address.list.length}
            />
          )}
        </Table>
        {isLoading === false && addressList.length > 0 ? (
          <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        ) : (
          <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
        )}

        <MemberAddressModal
          isOpen={openMemberAddressModal}
          setOpenModal={setOpenMemberAddressModal}
          addressId={addressId}
          address={clickedAddress}
          setAddressId={setAddressId}
          currentPage={currentPage}
        />
        <AddressRegistrationModal isOpen={openAddressRegistration} setOpenModal={setOpenAddressRegistration} />

        {/* 삭제 확인 모달 */}
        {isDeleteConfirmModalOpen && selectedAddresses.length > 0 && (
          <DeleteConfirmModal
            isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
            setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
            text={
              <p className='text-lg'>
                <span className='text-red-500 font-bold'>{selectedAddresses.length}</span>개의 주소를 선택하셨습니다
              </p>
            }
            firstButtonFunc={deleteConfirmFirstButtonFunc}
            secondButtonFunc={deleteConfirmSecondButtonFunc}
          />
        )}

        {/* alert 모달 */}
        {isAlertConfirmModalOpen && (
          <AlertConfirmModal
            isAlertConfirmModalOpen={isAlertConfirmModalOpen}
            setIsAlertConfirmModalOpen={setIsAlertConfirmModalOpen}
            text={<p className='text-lg pt-4 pb-7'>선택된 주소가 없습니다!</p>}
          />
        )}
      </div>
    </div>
  );
};

export default AddressTable;
