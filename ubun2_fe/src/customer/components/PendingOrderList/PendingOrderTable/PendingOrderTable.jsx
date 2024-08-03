import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useGetOrderDetail } from '../../../api/Order/OrderList/OrderModal/queris';
import { getPendingOrders } from '../../../api/Order/PendingOrderList/PendingOrderTable/pendingOrderTable';
import { useGetPendingOrders, useUpdatePendingOrder } from '../../../api/Order/PendingOrderList/PendingOrderTable/queris';
import TablePagination from '../../common/Pagination/TablePagination';
import TableHead from '../../common/Table/TableHead';
import { tableColumn } from '../../common/Table/tableIndex';
import { customTableTheme } from '../../common/Table/tableStyle';
import UnifiedOrderTableBody from '../../common/Table/UnifiedOrderTableBody';
import OrderDetailModal from '../../OrderList/OrderDetailModal/OrderDetailModal';
import PendingOrderTableFeature from './PendingOrderTableFeature';
import PendingOrderTableRow from './PendingOrderTableRow';
import useSkeletonStore from '../../../store/skeletonStore';
import SkeletonTable from '../../Skeleton/SkeletonTable';
import SkeletonPendingOrderTableRow from '../Skeleton/SkeletonPendingOrderTableRow';
import SkeletonPendingOrderTableFeature from '../Skeleton/SkeletonPendingOrderTableFeature';
import usePendingOrderTableStore from '../../../store/PendingOrderTable/pendingOrderTableStore';
import NoDataTable from '../../common/Table/NoDataTable.jsx';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../../common/Modal/DeleteConfirmModal.jsx';
import AlertConfirmModal from '../../common/Modal/AlertConfirmModal.jsx';
import CheckConfirmModal from '../../common/Modal/CheckConfirmModal.jsx';

const PendingOrderTable = () => {
  const navigate = useNavigate();

  // Modal 관련
  const [openPendingOrderDetailModal, setOpenPendingOrderDetailModal] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isAlertConfirmModalOpen, setIsAlertConfirmModalOpen] = useState(false);
  const [isCheckConfirmModalOpen, setIsCheckConfirmModalOpen] = useState(false);

  const [selectedPendingOrders, setSelectedPendingOrders] = useState([]); // 체크된 ID
  const [selectedPendingOrderDetail, setSelectedPendingOrderDetail] = useState({ orderId: null, subscription: false, currentPage: null }); // 선택된 주문 ID - 모달 오픈 시

  const { sort, updateSort } = usePendingOrderTableStore();
  const { searchCategory, setSearchCategory } = usePendingOrderTableStore(); // 검색할 카테고리 (드롭다운)
  const { searchKeyword, setSearchKeyword } = usePendingOrderTableStore(); // 검색된 단어
  const { setTotalElements } = usePendingOrderTableStore();
  const { resetData } = usePendingOrderTableStore();

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;
  const {
    data: pendingOrders,
    refetch: refetchPendingOrders,
    isLoading,
  } = useGetPendingOrders(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword, searchKeyword);

  const totalPages = pendingOrders?.data?.data?.totalPages;
  const totalElementsFromPage = pendingOrders?.data?.data?.totalElements;
  const pendingOrderList = pendingOrders?.data?.data?.content || [];

  const { data, refetch } = useGetOrderDetail(selectedPendingOrderDetail.orderId, selectedPendingOrderDetail.subscription);
  const { mutate: updatePendingOrderMutation } = useUpdatePendingOrder(currentPage);

  const dropdownRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['pendingOrder', nextPage, sort, searchCategory, searchKeyword],
        queryFn: () => getPendingOrders(nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword),
      });
    }
  }, [currentPage, queryClient, searchCategory, searchKeyword, sort, totalPages]);

  useEffect(() => {
    if (totalElementsFromPage !== undefined) {
      setTotalElements(totalElementsFromPage);
    }
  }, [totalElementsFromPage, setTotalElements]);

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedPendingOrders(
        pendingOrderList.map(pendingOrder => ({
          orderId: pendingOrder.orderId,
          subscription: pendingOrder.subscription,
        }))
      );
    } else {
      setSelectedPendingOrders([]);
    }
  };

  const handleRowChecked = (id, subscription) => {
    setSelectedPendingOrders(prev => {
      const isSelected = prev.some(pendingOrder => pendingOrder.orderId === id && pendingOrder.subscription === subscription);
      if (isSelected) {
        return prev.filter(pendingOrder => !(pendingOrder.orderId === id && pendingOrder.subscription === subscription));
      } else {
        return [...prev, { orderId: id, subscription }];
      }
    });
  };

  const handleRowClick = async (orderId, subscription, page) => {
    await setSelectedPendingOrderDetail({ orderId: orderId, subscription: subscription, currentPage: page });
    await refetch();
    setOpenPendingOrderDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenPendingOrderDetailModal(false);
    setSelectedPendingOrderDetail({ orderId: null, subscription: false });
  };

  const handleSearch = (term, category) => {
    setSearchKeyword(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    refetchPendingOrders();
    setCurrentPage(1);
  };

  const handleSort = async (column, sortType) => {
    await updateSort(column, sortType);
    refetchPendingOrders();
    setCurrentPage(1);
  };

  const { toggleIsReset } = usePendingOrderTableStore();
  const handleDataReset = async () => {
    await toggleIsReset();
    await resetData();
    await refetchPendingOrders();
    await setCurrentPage(1);
  };

  useEffect(() => {
    return () => {
      resetData();
    };
  }, []);

  const handleOrderUpdate = (orders, newStatus) => {
    const requestData = orders.map(order => ({
      orderId: order.subscription ? undefined : order.orderId,
      subscriptionOrderId: order.subscription ? order.orderId : undefined,
      orderStatus: newStatus,
      subscription: order.subscription,
    }));

    updatePendingOrderMutation({ requestData });
  };

  const NoDataTableButtonFunc = () => {
    navigate('/customer/app/dashboard');
  };

  const handleDropdownButtonClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
  };

  // Modal 관련
  const deleteConfirmFirstButtonFunc = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const deleteConfirmSecondButtonFunc = () => {
    handleOrderUpdate(selectedPendingOrders, 'DENIED');
    setIsDeleteConfirmModalOpen(false);
  };

  const checkConfirmFirstButtonFunc = () => {
    setIsCheckConfirmModalOpen(false);
  };

  const checkConfirmSecondButtonFunc = () => {
    handleOrderUpdate(selectedPendingOrders, 'APPROVED');
    setIsCheckConfirmModalOpen(false);
  };

  // isLoading 시, skeletonTable
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
      setSkeletonData(pendingOrderList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage);
      }
    }
  }, [
    pendingOrderList,
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
        SkeletonTableFeature={SkeletonPendingOrderTableFeature}
        TableRowComponent={SkeletonPendingOrderTableRow}
        tableColumns={tableColumn.order.pendingOrders}
        nonSort={tableColumn.order.nonSort}
      />
    );
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <PendingOrderTableFeature
        tableColumns={tableColumn.order.search}
        onSearch={handleSearch}
        handleOrderUpdate={handleOrderUpdate}
        selectedPendingOrders={selectedPendingOrders}
        handleDataReset={handleDataReset}
        dropdownRef={dropdownRef}
        setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
        setIsAlertConfirmModalOpen={setIsAlertConfirmModalOpen}
        setIsCheckConfirmModalOpen={setIsCheckConfirmModalOpen}
        currentPage={currentPage}
      />

      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={tableColumn.order.pendingOrders}
            allChecked={selectedPendingOrders.length === pendingOrderList.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            headerType='pendingOrders'
            nonSort={tableColumn.order.nonSort}
          />
          {pendingOrderList.length > 0 ? (
            <UnifiedOrderTableBody
              dataList={pendingOrderList}
              TableRowComponent={props => (
                <PendingOrderTableRow
                  {...props}
                  handleOrderUpdate={handleOrderUpdate}
                  setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
                  setIsCheckConfirmModalOpen={setIsCheckConfirmModalOpen}
                  setSelectedPendingOrders={setSelectedPendingOrders}
                />
              )}
              setOpenModal={handleRowClick}
              selectedOrders={selectedPendingOrders}
              handleRowChecked={handleRowChecked}
              currentPage={currentPage}
              PAGE_SIZE={PAGE_SIZE}
              colNum={tableColumn.order.pendingOrders.length}
            />
          ) : (
            <NoDataTable
              text={searchCategory && searchKeyword ? '검색 결과가 없습니다!' : '승인 대기중인 주문이 없습니다.'}
              buttonText={searchCategory && searchKeyword ? '다시 검색하기' : '메인으로 가기'}
              buttonFunc={searchCategory && searchKeyword ? handleDropdownButtonClick : NoDataTableButtonFunc}
              colNum={tableColumn.order.pendingOrders.length}
            />
          )}
        </Table>
      </div>

      {isLoading === false && pendingOrderList.length > 0 ? (
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
      ) : (
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
      )}

      <OrderDetailModal
        isOpen={openPendingOrderDetailModal}
        setOpenModal={handleCloseModal}
        title='승인 대기 주문 상세'
        primaryButtonText={'확인'}
        selectedOrderDetail={selectedPendingOrderDetail}
        handleOrderUpdate={handleOrderUpdate}
      />

      {isDeleteConfirmModalOpen && selectedPendingOrders.length > 0 && (
        <DeleteConfirmModal
          isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
          setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
          text={
            <p className='text-lg'>
              <span className='font-bold text-red-500'>{selectedPendingOrders.length}</span>건의 주문을 취소하시겠습니까?
            </p>
          }
          firstButtonFunc={deleteConfirmFirstButtonFunc}
          secondButtonFunc={deleteConfirmSecondButtonFunc}
        />
      )}

      {isAlertConfirmModalOpen && (
        <AlertConfirmModal
          isAlertConfirmModalOpen={isAlertConfirmModalOpen}
          setIsAlertConfirmModalOpen={setIsAlertConfirmModalOpen}
          text={<p className='pt-4 text-lg pb-7'>선택된 주문이 없습니다!</p>}
        />
      )}

      {isCheckConfirmModalOpen && (
        <CheckConfirmModal
          isCheckConfirmModalOpen={isCheckConfirmModalOpen}
          setIsCheckConfirmModalOpen={setIsCheckConfirmModalOpen}
          text={
            <p className='text-lg'>
              <span className='font-bold text-green-500'>{selectedPendingOrders.length}</span>건의 주문을 승인하시겠습니까?
            </p>
          }
          firstButtonFunc={checkConfirmFirstButtonFunc}
          secondButtonFunc={checkConfirmSecondButtonFunc}
          secondText={'승인'}
        />
      )}
    </div>
  );
};

export default PendingOrderTable;
