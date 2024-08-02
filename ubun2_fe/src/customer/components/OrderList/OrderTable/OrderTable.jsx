import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useGetOrderDetail } from '../../../api/Order/OrderList/OrderModal/queris.js';
import { getOrders } from '../../../api/Order/OrderList/OrderTable/orderTable.js';
import { useGetOrders } from '../../../api/Order/OrderList/OrderTable/queris.js';
import TablePagination from '../../common/Pagination/TablePagination.jsx';
import TableHead from '../../common/Table/TableHead.jsx';
import { tableColumn } from '../../common/Table/tableIndex.js';
import { customTableTheme } from '../../common/Table/tableStyle.js';
import UnifiedOrderTableBody from '../../common/Table/UnifiedOrderTableBody.jsx';
import OrderDetailModal from '../OrderDetailModal/OrderDetailModal.jsx';
import OrderTableFeature from './OrderTableFeature.jsx';
import OrderTableRow from './OrderTableRow.jsx';
import useSkeletonStore from '../../../store/skeletonStore.js';
import SkeletonTable from '../../Skeleton/SkeletonTable.jsx';
import useOrderTableStore from '../../../store/OrderTable/orderTableStore.js';
import SkeletonOrderTableFeature from '../Skeleton/SkeletonOrderTableFeature.jsx';
import SkeletonOrderTableRow from '../Skeleton/SkeletonOrderTableRow.jsx';
import NoDataTable from '../../common/Table/NoDataTable.jsx';
import { useNavigate } from 'react-router-dom';

const OrderTable = () => {
  const navigate = useNavigate();
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState([]); // 체크된 멤버 ID
  const [selectedOrderDetail, setSelectedOrderDetail] = useState({ orderId: null, subscription: false, currentPage: null }); // 선택된 주문 ID - 모달 오픈 시

  const { sort, updateSort } = useOrderTableStore();
  const { searchCategory, setSearchCategory } = useOrderTableStore(); // 검색할 카테고리 (드롭다운)
  const { searchKeyword, setSearchKeyword } = useOrderTableStore(); // 검색된 단어
  const { setTotalElements } = useOrderTableStore();
  const { resetData } = useOrderTableStore();

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;
  const { data: orders, refetch: refetchOrders, isLoading } = useGetOrders(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword, searchKeyword);

  const totalPages = orders?.data?.data?.totalPages;
  const totalElementsFromPage = orders?.data?.data?.totalElements;
  const orderList = orders?.data?.data?.content || [];

  const { data, refetch } = useGetOrderDetail(selectedOrderDetail.orderId, selectedOrderDetail.subscription);

  const dropdownRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['order', nextPage, sort, searchCategory, searchKeyword],
        queryFn: () => getOrders(nextPage, PAGE_SIZE, sort, searchCategory, searchKeyword),
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
      setSelectedOrders(
        orderList.map(order => ({
          orderId: order.orderId,
          subscription: order.subscription,
        }))
      );
    } else {
      setSelectedOrders([]);
    }
  };

  const handleRowChecked = (id, subscription) => {
    setSelectedOrders(prev => {
      const isSelected = prev.some(order => order.orderId === id && order.subscription === subscription); // 변경된 부분
      if (isSelected) {
        return prev.filter(order => !(order.orderId === id && order.subscription === subscription)); // 변경된 부분
      } else {
        return [...prev, { orderId: id, subscription }];
      }
    });
  };

  const handleRowClick = async (orderId, subscription, page) => {
    await setSelectedOrderDetail({ orderId: orderId, subscription: subscription, currentPage: page });
    await refetch();
    setOpenOrderDetailModal(true);
  };

  const handleSearch = (term, category) => {
    setSearchKeyword(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    refetchOrders();
    setCurrentPage(1);
  };

  const handleSort = async (column, sortType) => {
    await updateSort(column, sortType);
    refetchOrders();
    setCurrentPage(1);
  };

  const NoDataTableButtonFunc = () => {
    navigate('/customer/app/dashboard');
  };

  const { toggleIsReset } = useOrderTableStore();
  const handleDataReset = async () => {
    await toggleIsReset();
    await resetData();
    await refetchOrders();
    await setCurrentPage(1);
  };

  const handleDropdownButtonClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      resetData();
    };
  }, []);

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
      setSkeletonData(orderList);
      setSkeletonTotalPage(totalPages);
      setSkeletonSortData(sort);
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage);
      }
    }
  }, [
    orderList,
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
    return <SkeletonTable SkeletonTableFeature={SkeletonOrderTableFeature} TableRowComponent={SkeletonOrderTableRow} tableColumns={tableColumn.orders} />;
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <OrderTableFeature tableColumns={tableColumn.ordersSearch} onSearch={handleSearch} handleDataReset={handleDataReset} dropdownRef={dropdownRef} />

      {/* 테이블 */}
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={tableColumn.orders}
            allChecked={selectedOrders.length === orderList?.length}
            setAllChecked={handleAllChecked}
            handleSort={handleSort}
            headerType='orders'
            checkable={false}
          />
          {orderList.length > 0 ? (
              <UnifiedOrderTableBody
                  dataList={orderList}
                  TableRowComponent={OrderTableRow}
                  setOpenModal={handleRowClick}
                  selectedOrders={selectedOrders}
                  handleRowChecked={handleRowChecked}
                  currentPage={currentPage}
                  PAGE_SIZE={PAGE_SIZE}
                  colNum={tableColumn.orders.length}
              />
          ) : (
            <NoDataTable
              text={searchCategory && searchKeyword ? '검색 결과가 없습니다!' : '주문 내역이 없습니다.'}
              buttonText={searchCategory && searchKeyword ? '다시 검색하기' : '메인으로 가기'}
              buttonFunc={searchCategory && searchKeyword ? handleDropdownButtonClick : NoDataTableButtonFunc}
              colNum={tableColumn.orders.length}
            />
          )}
        </Table>
      </div>
      {/* 페이지네이션 */}
      {isLoading === false && orderList.length > 0 ? (
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
      ) : (
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
      )}
      {/* 모달 */}
      {openOrderDetailModal && (
        <OrderDetailModal
          isOpen={openOrderDetailModal}
          setOpenModal={setOpenOrderDetailModal}
          title='주문 상세'
          primaryButtonText={'확인'}
          selectedOrderDetail={selectedOrderDetail}
        />
      )}
    </div>
  );
};

export default OrderTable;
