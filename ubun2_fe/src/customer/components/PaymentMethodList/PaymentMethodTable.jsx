import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table } from 'flowbite-react';

import MemberPaymentMethodModal from './MemberPaymentMethodModal';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import DynamicTableBody from '../common/Table/DynamicTableBody';
import { useQueryClient } from '@tanstack/react-query';
import TablePagination from '../common/Pagination/TablePagination';
import PaymentMethodTableFeature from './PaymentMethodTableFeature';
import PaymentMethodTableRow from './PaymentMethodTableRow';
import { customTableTheme } from '../common/Table/tableStyle';

import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import useAddressStore from '../../store/Address/useAddressStore';

import { useGetPayments } from '../../api/PaymentMethod/Table/queris';
import { useGetPaymentDetail } from '../../api/PaymentMethod/Modal/queris';
import usePaymentMethodTableStore, { resetPaymentMethodTableStore } from '../../store/PaymentMethod/paymentMethodTableStore';
import PaymentMethodRegistrationModal from './PaymentMethodRegistrationModal';

import SkeletonTable from '../Skeleton/SkeletonTable';
import SkeletonPaymentMethodTableRow from './Skeleton/SkeletonPaymentMethodTableRow';
import SkeletonPaymentMethodTableFeature from './Skeleton/SkeletonPaymentMethodTableFeature';

import useSkeletonStore from '../../store/skeletonStore';

import { getAccountPayments } from '../../api/PaymentMethod/Table/accountPaymentTable';
import { getCardPayments } from '../../api/PaymentMethod/Table/cardPaymentTable';

const PaymentMethodTable = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const { paymentMethodType, openModal, setOpenModal } = paymentMethodStore();
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const { sort, updateSort, searchCategory, setSearchCategory, searchKeyword, setSearchKeyword, resetData, toggleIsReset } = usePaymentMethodTableStore();
  const PAGE_SIZE = 8;
  const isAccount = paymentMethodType === 'ACCOUNT';

  const [currentPage, setCurrentPage] = useState(1);
  const [clickedPayment, setClickedPayment] = useState(null);

  const queryClient = useQueryClient();

  const { data: payments, refetch: refetchPayments, isLoading } = useGetPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const paymentList = payments?.data?.data?.content;
  const totalPages = payments?.data?.data?.totalPages || 5;

  const { refetch: refetchPaymentDetail } = useGetPaymentDetail(paymentMethodId);

  const { setSelectedMemberId } = useAddressStore();

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

  const handleAllChecked = useCallback(
    checked => {
      setCheckedMembers(checked ? paymentList.map(payment => payment.id) : []);
    },
    [paymentList]
  );

  const handleRowChecked = useCallback(id => {
    setCheckedMembers(prev => (prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]));
  }, []);

  const handleRowClick = useCallback(
    async (paymentMethodId, memberId, payment) => {
      setPaymentMethodId(paymentMethodId);
      await refetchPaymentDetail();
      setOpenModal(true);
      setClickedPayment(payment);
      setSelectedMemberId(memberId);
    },
    [refetchPaymentDetail, setOpenModal, setSelectedMemberId]
  );

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

  // useEffect(() => {
  //   resetPaymentMethodTableStore();
  // }, []);

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

  const { setSkeletonData, setSkeletonTotalPage, setSkeletonSortData } = useSkeletonStore();

  useEffect(() => {
    if (!isLoading) {
      setSkeletonData(paymentList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
    }
  }, [isLoading, paymentList, totalPages, sort]);

  if (isLoading) {
    return (
      <SkeletonTable
        SkeletonTableFeature={SkeletonPaymentMethodTableFeature}
        TableRowComponent={SkeletonPaymentMethodTableRow}
        tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
        nonSort={tableColumn.paymentMethod.nonSort}
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
      />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
            allChecked={checkedMembers?.length === paymentList?.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            headerType={'paymentMethod'}
            nonSort={tableColumn.paymentMethod.nonSort}
          />
          <DynamicTableBody
            dataList={paymentList}
            TableRowComponent={PaymentMethodTableRow}
            dynamicKey='paymentMethodId'
            dynamicId='paymentMethodId'
            setOpenModal={handleRowClick}
            selectedMembers={checkedMembers}
            handleRowChecked={handleRowChecked}
            currentPage={currentPage}
          />
        </Table>
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        <MemberPaymentMethodModal
          isOpen={openModal}
          setOpenModal={setOpenModal}
          paymentMethodId={paymentMethodId}
          setPaymentMethodId={setPaymentMethodId}
          clickedPayment={clickedPayment}
        />
        <PaymentMethodRegistrationModal isOpen={openRegistrationModal} setOpenModal={setOpenRegistrationModal} />
      </div>
    </div>
  );
};

export default PaymentMethodTable;
