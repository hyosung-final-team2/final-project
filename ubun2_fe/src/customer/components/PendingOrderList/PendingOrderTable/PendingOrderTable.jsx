import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
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
import NoDataTable from "../../common/Table/NoDataTable.jsx";
import {useNavigate} from "react-router-dom";

const PendingOrderTable = () => {
  const navigate = useNavigate();
  const [openPendingOrderDetailModal, setOpenPendingOrderDetailModal] = useState(false);

  const [selectedPendingOrders, setSelectedPendingOrders] = useState([]); // 체크된 ID
  const [selectedPendingOrderDetail, setSelectedPendingOrderDetail] = useState({ orderId: null, subscription: false, currentPage: null }); // 선택된 주문 ID - 모달 오픈 시

  const { sort, updateSort } = usePendingOrderTableStore();
  const { searchCategory, setSearchCategory } = usePendingOrderTableStore(); // 검색할 카테고리 (드롭다운)
  const { searchKeyword, setSearchKeyword } = usePendingOrderTableStore(); // 검색된 단어
  const { resetData } = usePendingOrderTableStore();

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;
  const {
    data: pendingOrders,
    refetch: refetchPendingOrders,
    isLoading,
  } = useGetPendingOrders(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword, searchKeyword);

  const totalPages = pendingOrders?.data?.data?.totalPages;
  const pendingOrderList = pendingOrders?.data?.data?.content || [];

  const { data, refetch } = useGetOrderDetail(selectedPendingOrderDetail.orderId, selectedPendingOrderDetail.subscription); // 테이블 데이터 가져오기
  const { mutate: updatePendingOrderMutation } = useUpdatePendingOrder(currentPage); // 상태 업데이트

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['pendingOrder', nextPage, sort, searchCategory, searchKeyword],
        queryFn: () => getPendingOrders(nextPage, PAGE_SIZE),
      });
    }
  }, [currentPage, queryClient, searchCategory, searchKeyword, sort, totalPages]);

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
    console.log(column, sortType);
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
    navigate("/customer/app/dashboard")
  }

  // isLoading 시, skeletonTable
  const { setSkeletonData, setSkeletonTotalPage, setSkeletonSortData, setSkeletonSearchCategory, setSkeletonSearchKeyword } = useSkeletonStore();

  useEffect(() => {
    if (!isLoading) {
      setSkeletonData(pendingOrderList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
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
    // 각자의 TableFeature, TableRow, TaleColumn 만 넣어주면 공통으로 동작
    return (
      <SkeletonTable
        SkeletonTableFeature={SkeletonPendingOrderTableFeature}
        TableRowComponent={SkeletonPendingOrderTableRow}
        tableColumns={tableColumn.pendingOrders}
      />
    );
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <PendingOrderTableFeature
        tableColumns={tableColumn.ordersSearch}
        onSearch={handleSearch}
        handleOrderUpdate={handleOrderUpdate}
        selectedPendingOrders={selectedPendingOrders}
        handleDataReset={handleDataReset}
      />

      {/* 테이블 */}
      {/*<div className='px-4 shadow-md'>*/}
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={tableColumn.pendingOrders}
            allChecked={selectedPendingOrders.length === pendingOrderList.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            headerType='pendingOrders'
          />
          {
            pendingOrderList.length > 0 ? (
                <UnifiedOrderTableBody
                    dataList={pendingOrderList}
                    TableRowComponent={props => <PendingOrderTableRow {...props} handleOrderUpdate={handleOrderUpdate} />}
                    setOpenModal={handleRowClick}
                    selectedOrders={selectedPendingOrders}
                    handleRowChecked={handleRowChecked}
                    currentPage={currentPage}
                />
            ) : (
                <NoDataTable text="승인대기중인 주문이 없습니다" buttonText="메인으로 가기" buttonFunc={NoDataTableButtonFunc}/>
            )
          }

        </Table>
      </div>
      {/* 페이지네이션 */}
      {isLoading === false && pendingOrderList.length > 0 ? (
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
      ) :
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
        }
      {/* 모달 */}
      <OrderDetailModal
        isOpen={openPendingOrderDetailModal}
        setOpenModal={handleCloseModal}
        title='승인 대기 주문 상세'
        primaryButtonText={'확인'}
        selectedOrderDetail={selectedPendingOrderDetail}
        handleOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
};

export default PendingOrderTable;
