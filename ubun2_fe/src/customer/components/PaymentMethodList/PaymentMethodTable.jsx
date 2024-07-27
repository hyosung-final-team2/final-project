import { useState, useEffect } from 'react';
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

import { getCardPayments } from '../../api/PaymentMethod/Table/cardPaymentTable';
import { getAccountPayments } from '../../api/PaymentMethod/Table/accountPaymentTable';
import { useGetCardPayments, useGetAccountPayments } from '../../api/PaymentMethod/Table/queris';
import { useGetPaymentDetail } from '../../api/PaymentMethod/Modal/queris';
import usePaymentMethodTableStore from '../../store/PaymentMethod/paymentMethodTableStore';

const PaymentMethodTable = () => {
  // const [openModal, setOpenModal] = useState(false);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const { setSelectedMemberId, paymentMethodType, openModal, setOpenModal } = paymentMethodStore();
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const { sort, updateSort, searchCategory, setSearchCategory, searchKeyword, setSearchKeyword, resetData, toggleIsReset } = usePaymentMethodTableStore();
  const PAGE_SIZE = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [clickedPayment, setClickedPayment] = useState(null);
  const { data: cards, refetch: refetchCards } = useGetCardPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);
  const { data: accounts, refetch: refetchAccounts } = useGetAccountPayments(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const cardList = cards?.data?.data?.content || [];
  const accountList = accounts?.data?.data?.content || [];

  const isAccount = paymentMethodType === 'ACCOUNT';
  const totalPages = (isAccount ? accounts : cards)?.data?.data?.totalPages ?? 5;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      isAccount
        ? queryClient.prefetchQuery({
            queryKey: ['payment', { type: 'ACCOUNT', page: nextPage, sort, searchCategory, searchKeyword }],
            queryFn: () => getAccountPayments(nextPage),
          })
        : queryClient.prefetchQuery({
            queryKey: ['payment', { type: 'CARD', page: nextPage, sort, searchCategory, searchKeyword }],
            queryFn: () => getCardPayments(nextPage),
          });
    }
  }, [currentPage, queryClient, totalPages, sort, searchCategory, searchKeyword]);

  const { refetch } = useGetPaymentDetail(paymentMethodId);

  const handleAllChecked = checked => {
    if (checked) {
      setCheckedMembers(accounts.map(payment => payment.id));
    } else {
      setCheckedMembers([]);
    }
  };

  const handleRowChecked = id => {
    setCheckedMembers(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  const handleRowClick = async (paymentMethodId, memberId, payment) => {
    await setPaymentMethodId(paymentMethodId);
    await refetch();
    setOpenModal(true);
    setClickedPayment(payment);
    setSelectedMemberId(memberId);
  };

  const handleSearch = (term, category) => {
    setSearchKeyword(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;
    refetchCards();
    refetchAccounts();
    setCurrentPage(1);
  };

  const handleSort = async (column, sortType) => {
    await updateSort(column, sortType);
    refetchCards();
    refetchAccounts();
    setCurrentPage(1);
  };

  const handleDataReset = async () => {
    await toggleIsReset();
    await resetData();
    await refetchCards();
    await refetchAccounts();
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log();
    return resetData();
  }, []);

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <PaymentMethodTableFeature
        setOpenModal={setOpenModal}
        setCurrentPage={setCurrentPage}
        handleDataReset={handleDataReset}
        onSearch={handleSearch}
        tableColumns={tableColumn.paymentMethod}
      />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          {
            <>
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
            </>
          }
        </Table>
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        <MemberPaymentMethodModal
          isOpen={openModal}
          setOpenModal={setOpenModal}
          paymentMethodId={paymentMethodId}
          setPaymentMethodId={setPaymentMethodId}
          clickedPayment={clickedPayment}
        />
      </div>
    </div>
  );
};

export default PaymentMethodTable;
