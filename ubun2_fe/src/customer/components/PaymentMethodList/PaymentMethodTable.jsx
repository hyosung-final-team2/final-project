import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table } from 'flowbite-react';

import MemberPaymentMethodModal from './MemberPaymentMethodModal';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import TableBody from '../common/Table/TableBody';
import { useQueryClient } from '@tanstack/react-query';
import TablePagination from '../common/Pagination/TablePagination';
import PaymentMethodTableFeature from './PaymentMethodTableFeature';
import PaymentMethodTableRow from './PaymentMethodTableRow';
import { customTableTheme } from '../common/Table/tableStyle';

import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import useAddressStore from '../../store/Address/useAddressStore';

import { useGetPayments, useDeleteSelectedPayments } from '../../api/PaymentMethod/Table/queris';
import { useGetPaymentDetail } from '../../api/PaymentMethod/Modal/queris';
import usePaymentMethodTableStore, { resetPaymentMethodTableStore } from '../../store/PaymentMethod/paymentMethodTableStore';
import PaymentMethodRegistrationModal from './PaymentMethodRegistrationModal';

import SkeletonTable from '../Skeleton/SkeletonTable';
import SkeletonPaymentMethodTableRow from './Skeleton/SkeletonPaymentMethodTableRow';
import SkeletonPaymentMethodTableFeature from './Skeleton/SkeletonPaymentMethodTableFeature';

import useSkeletonStore from '../../store/skeletonStore';

import { getAccountPayments } from '../../api/PaymentMethod/Table/accountPaymentTable';
import { getCardPayments } from '../../api/PaymentMethod/Table/cardPaymentTable';
import NoDataTable from '../common/Table/NoDataTable';

import DeleteConfirmModal from '../common/Modal/DeleteConfirmModal';
import AlertConfirmModal from '../common/Modal/AlertConfirmModal';

const PaymentMethodTable = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [checkedPaymentMethods, setCheckedPaymentMethods] = useState([]);
  const { paymentMethodType, openModal, setOpenModal } = paymentMethodStore();
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const { sort, updateSort, searchCategory, setSearchCategory, searchKeyword, setSearchKeyword, resetData, toggleIsReset, setTotalElements } =
    usePaymentMethodTableStore();
  const PAGE_SIZE = 10;
  const isAccount = paymentMethodType === 'ACCOUNT';

  const [currentPage, setCurrentPage] = useState(1);
  const [clickedPayment, setClickedPayment] = useState(null);

  const { mutate: deleteSelectedPaymentsMutate } = useDeleteSelectedPayments(checkedPaymentMethods);

  const queryClient = useQueryClient();

  const { data: payments, refetch: refetchPayments, isLoading } = useGetPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const paymentList = payments?.data?.data?.content;
  const totalPages = payments?.data?.data?.totalPages;
  const totalElementsFromPage = payments?.data?.data?.totalElements;

  const { refetch: refetchPaymentDetail } = useGetPaymentDetail(paymentMethodId);

  const { setSelectedMemberId } = useAddressStore();

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isAlertConfirmModalOpen, setIsAlertConfirmModalOpen] = useState(false);

  useEffect(() => {
    setCheckedPaymentMethods([]);
  }, [paymentMethodType]);

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const queryKey = ['payment', { type: isAccount ? 'ACCOUNT' : 'CARD', page: nextPage, sort, searchCategory, searchKeyword }];
      const queryFn = isAccount
        ? () => getAccountPayments(nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword)
        : () => getCardPayments(nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword);
      queryClient.prefetchQuery({ queryKey, queryFn });
    }
  }, [currentPage, queryClient, totalPages, isAccount, sort, searchCategory, searchKeyword]);

  useEffect(() => {
    if (totalElementsFromPage !== undefined) {
      setTotalElements(totalElementsFromPage);
    }
  }, [totalElementsFromPage, setTotalElements]);

  const handleAllChecked = useCallback(
    checked => {
      setCheckedPaymentMethods(checked ? paymentList.map(payment => payment.paymentMethodId) : []);
    },
    [paymentList]
  );

  const handleRowChecked = useCallback((paymentMethodId, isChecked) => {
    setCheckedPaymentMethods(prev => (isChecked ? [...prev, paymentMethodId] : prev.filter(id => id !== paymentMethodId)));
  }, []);

  const handleRowClick = async (paymentMethodId, memberId, payment) => {
    setPaymentMethodId(paymentMethodId);
    setOpenModal(true);
    setClickedPayment(payment);
    setSelectedMemberId(memberId);
    await refetchPaymentDetail();
  };

  const handleSearch = useCallback(
    (term, category) => {
      if (term.trim() === '' || category === '카테고리') return;
      setSearchKeyword(term);
      setSearchCategory(category);
      setCurrentPage(1);
      refetchPayments();
    },
    [setSearchKeyword, setSearchCategory, setCurrentPage, refetchPayments]
  );

  const handleSort = useCallback(
    async (column, sortType) => {
      await updateSort(column, sortType);
      setCurrentPage(1);
      refetchPayments();
    },
    [updateSort, refetchPayments]
  );

  const handleDataReset = async () => {
    await Promise.all([toggleIsReset(), resetData()]);
    setCurrentPage(1);
    await refetchPayments();
  };

  const dropdownRef = useRef(null);

  const handleDropdownButtonClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
  };

  const NoDataTableButtonFunc = () => {
    setOpenRegistrationModal(true);
  };

  useEffect(() => {
    const handleLoad = () => {
      // performance.navigation은 deprecated되었지만, 여전히 많은 브라우저에서 지원됩니다.
      if (performance.navigation.type === 1) {
        // 1은 새로고침을 의미합니다.
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0 && entries[0].type === 'reload') {
          // 강제 새로고침 (Ctrl+F5)인 경우 리셋
          resetPaymentMethodTableStore();
        }
      }
    };

    // 페이지 로드 완료 시 실행
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    return () => resetData();
  }, [resetData]);

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
    if (!isLoading) {
      setSkeletonData(paymentList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage);
      }
    }
  }, [
    isLoading,
    paymentList,
    totalPages,
    sort,
    searchKeyword,
    searchCategory,
    setSkeletonTotalPage,
    setSkeletonSortData,
    setSkeletonData,
    setSkeletonSearchCategory,
    setSkeletonSearchKeyword,
  ]);

  const deleteConfirmFirstButtonFunc = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const deleteConfirmSecondButtonFunc = () => {
    deleteSelectedPaymentsMutate();
    setIsDeleteConfirmModalOpen(false);
  };

  if (isLoading) {
    return (
      <SkeletonTable
        SkeletonTableFeature={SkeletonPaymentMethodTableFeature}
        TableRowComponent={SkeletonPaymentMethodTableRow}
        tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
        nonSort={tableColumn.paymentMethod.nonSort}
        PAGE_SIZE={PAGE_SIZE}
        colNum={isAccount ? tableColumn.paymentMethod.accountList.length : tableColumn.paymentMethod.cardList.length}
      />
    );
  }
  const searchCategoryOptions = isAccount ? tableColumn.paymentMethod.accountSearch : tableColumn.paymentMethod.cardSearch;

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <PaymentMethodTableFeature
        setOpenModal={setOpenRegistrationModal}
        setCurrentPage={setCurrentPage}
        handleDataReset={handleDataReset}
        onSearch={handleSearch}
        tableColumns={searchCategoryOptions}
        dropdownRef={dropdownRef}
        setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
        setIsAlertConfirmModalOpen={setIsAlertConfirmModalOpen}
        checkedPaymentMethods={checkedPaymentMethods}
      />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
            allChecked={checkedPaymentMethods?.length === paymentList?.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            headerType={'paymentMethod'}
            nonSort={tableColumn.paymentMethod.nonSort}
          />
          {paymentList.length > 0 ? (
            <TableBody
              TableRowComponent={PaymentMethodTableRow}
              dataList={paymentList}
              dynamicId='paymentMethodId'
              setOpenModal={handleRowClick}
              selectedMembers={checkedPaymentMethods}
              handleRowChecked={handleRowChecked}
              currentPage={currentPage}
              PAGE_SIZE={PAGE_SIZE}
              colNum={isAccount ? tableColumn.paymentMethod.accountList.length : tableColumn.paymentMethod.cardList.length}
            />
          ) : (
            <NoDataTable
              text={searchCategory && searchKeyword ? '검색 결과가 없습니다!' : '등록된 결제수단이 없습니다.'}
              buttonText={searchCategory && searchKeyword ? '다시 검색하기' : '결제수단 등록하기'}
              buttonFunc={searchCategory && searchKeyword ? handleDropdownButtonClick : NoDataTableButtonFunc}
              colNum={tableColumn.address.list.length}
            />
          )}
        </Table>
        {isLoading === false && paymentList.length > 0 ? (
          <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        ) : (
          <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
        )}
        <MemberPaymentMethodModal
          isOpen={openModal}
          setOpenModal={setOpenModal}
          paymentMethodId={paymentMethodId}
          setPaymentMethodId={setPaymentMethodId}
          clickedPayment={clickedPayment}
        />
        <PaymentMethodRegistrationModal isOpen={openRegistrationModal} setOpenModal={setOpenRegistrationModal} />

        {/* 삭제 화인 모달 */}
        {isDeleteConfirmModalOpen && checkedPaymentMethods.length > 0 && (
          <DeleteConfirmModal
            isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
            setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
            text={
              <p className='text-lg'>
                <span className='text-red-500 font-bold'>{checkedPaymentMethods.length}</span>개의 결제수단을 선택하셨습니다
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
            text={<p className='text-lg pt-4 pb-7'>선택된 결제수단이이 없습니다!</p>}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodTable;
