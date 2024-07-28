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
import { useGetCardPayments, useGetAccountPayments } from '../../api/PaymentMethod/Table/queris';
import { useGetPaymentDetail } from '../../api/PaymentMethod/Modal/queris';
import usePaymentMethodTableStore from '../../store/PaymentMethod/paymentMethodTableStore';
import PaymentMethodRegistrationModal from './PaymentMethodRegistrationModal';

import SkeletonTable from '../Skeleton/SkeletonTable';
import SkeletonPaymentMethodTableRow from './Skeleton/SkeletonPaymentMethodTableRow';
import SkeletonPaymentMethodTableFeature from './Skeleton/SkeletonPaymentMethodTableFeature';

import useSkeletonStore from '../../store/skeletonStore';

const PaymentMethodTable = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const { setSelectedMemberId, paymentMethodType, openModal, setOpenModal } = paymentMethodStore();
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const { sort, updateSort, searchCategory, setSearchCategory, searchKeyword, setSearchKeyword, resetData, toggleIsReset } = usePaymentMethodTableStore();
  const PAGE_SIZE = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [clickedPayment, setClickedPayment] = useState(null);

  const queryClient = useQueryClient();

  const { data: cards, refetch: refetchCards } = useGetCardPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);
  const { data: accounts, refetch: refetchAccounts, isLoading } = useGetAccountPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const cardList = cards?.data?.data?.content;
  const accountList = accounts?.data?.data?.content;

  const isAccount = paymentMethodType === 'ACCOUNT';
  const totalPages = (isAccount ? accounts : cards)?.data?.data?.totalPages;

  const { refetch: refetchPaymentDetail } = useGetPaymentDetail(paymentMethodId);

  const handleAllChecked = useCallback(
    checked => {
      setCheckedMembers(checked ? accountList.map(payment => payment.id) : []);
    },
    [accountList]
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
      refetchCards();
      refetchAccounts();
    },
    [setSearchKeyword, setSearchCategory, refetchCards, refetchAccounts]
  );

  const handleSort = useCallback(
    async (column, sortType) => {
      await updateSort(column, sortType);
      setCurrentPage(1);
      refetchCards();
      refetchAccounts();
    },
    [updateSort, refetchCards, refetchAccounts]
  );

  const handleDataReset = useCallback(async () => {
    await Promise.all([toggleIsReset(), resetData()]);
    setCurrentPage(1);
    await Promise.all([refetchCards(), refetchAccounts()]);
  }, [toggleIsReset, resetData, refetchCards, refetchAccounts]);

  useEffect(() => {
    return () => resetData();
  }, [resetData]);

  const { setSkeletonData, setSkeletonTotalPage, setSkeletonSortData } = useSkeletonStore();

  useEffect(() => {
    if (!isLoading) {
      const list = isAccount ? accountList : cardList;
      setSkeletonData(list);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
    }
  }, [isLoading, totalPages, sort, setSkeletonData, setSkeletonTotalPage, setSkeletonSortData]);

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const queryKey = ['payment', { type: isAccount ? 'ACCOUNT' : 'CARD', page: nextPage, sort, searchCategory, searchKeyword }];
      const queryFn = isAccount ? () => getAccountPayments(nextPage) : () => getCardPayments(nextPage);
      queryClient.prefetchQuery({ queryKey, queryFn });
    }
  }, [currentPage, queryClient, totalPages, isAccount, sort, searchCategory, searchKeyword]);

  if (isLoading) {
    return (
      <SkeletonTable
        SkeletonTableFeature={SkeletonPaymentMethodTableFeature}
        TableRowComponent={SkeletonPaymentMethodTableRow}
        tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
      />
    );
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <PaymentMethodTableFeature
        setOpenModal={setOpenRegistrationModal}
        setCurrentPage={setCurrentPage}
        handleDataReset={handleDataReset}
        onSearch={handleSearch}
        tableColumns={tableColumn.paymentMethod}
      />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={isAccount ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList}
            allChecked={isAccount ? checkedMembers.length === accountList.length : checkedMembers.length === cardList.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
          />
          <DynamicTableBody
            dataList={isAccount ? accountList : cardList}
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
