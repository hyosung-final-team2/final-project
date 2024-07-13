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

const PendingOrderTable = () => {
  const [openPendingOrderDetailModal, setOpenPendingOrderDetailModal] = useState(false);
  const [selectedPendingOrders, setSelectedPendingOrders] = useState([]); // 체크된 ID
  const [selectedPendingOrderDetail, setSelectedPendingOrderDetail] = useState({ orderId: null, subscription: false });
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const [currentPage, setCurrentPage] = useState(1);
  const { data: pendingOrders } = useGetPendingOrders(currentPage);

  const totalPages = pendingOrders?.data?.data?.totalPages ?? 5;
  const pendingOrderList = pendingOrders?.data?.data?.content || [];

  const { data, refetch } = useGetOrderDetail(selectedPendingOrderDetail.orderId, selectedPendingOrderDetail.subscription); // 테이블 데이터 가져오기
  const { mutate: updatePendingOrderMutation } = useUpdatePendingOrder(currentPage); // 상태 업데이트

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['pendingOrder', nextPage],
        queryFn: () => getPendingOrders(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

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

  const handleRowClick = async (orderId, subscription) => {
    await setSelectedPendingOrderDetail({ orderId, subscription });
    await refetch();
    setOpenPendingOrderDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenPendingOrderDetailModal(false);
    setSelectedPendingOrderDetail({ orderId: null, subscription: false });
  };

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    // TODO: 검색 API 호출
    console.log(`${category} : ${term}`);
  };

  const handleOrderUpdate = (orders, newStatus) => {
    const requestData = orders.map(order => ({
      orderId: order.subscription ? undefined : order.orderId,
      subscriptionOrderId: order.subscription ? order.orderId : undefined,
      orderStatus: newStatus,
      subscription: order.subscription,
    }));

    updatePendingOrderMutation({ requestData });
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <PendingOrderTableFeature
        tableColumns={tableColumn.pendingOrders}
        onSearch={handleSearch}
        handleOrderUpdate={handleOrderUpdate}
        selectedPendingOrders={selectedPendingOrders}
      />

      {/* 테이블 */}
      <div className='px-4 shadow-md'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={tableColumn.pendingOrders}
            allChecked={selectedPendingOrders.length === pendingOrderList.length}
            setAllChecked={handleAllChecked}
          />
          <UnifiedOrderTableBody
            dataList={pendingOrderList}
            TableRowComponent={props => <PendingOrderTableRow {...props} handleOrderUpdate={handleOrderUpdate} />}
            setOpenModal={handleRowClick}
            selectedOrders={selectedPendingOrders}
            handleRowChecked={handleRowChecked}
          />
        </Table>
      </div>
      {/* 페이지네이션 */}
      <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
      {/* 모달 */}
      <OrderDetailModal
        isOpen={openPendingOrderDetailModal}
        setOpenModal={handleCloseModal}
        title='승인 대기 주문 상세'
        primaryButtonText={'확인'}
        selectedOrderDetail={selectedPendingOrderDetail}
      />
    </div>
  );
};

export default PendingOrderTable;
