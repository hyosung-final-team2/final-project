import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
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

const OrderTable = () => {
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]); // 체크된 멤버 ID
  const [selectedOrderDetail, setSelectedOrderDetail] = useState({ orderId: null, subscription: false });
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const [currentPage, setCurrentPage] = useState(1);
  const { data: orders } = useGetOrders(currentPage);

  const totalPages = orders?.data?.data?.totalPages ?? 5;
  const orderList = orders?.data?.data?.content || [];

  const { data, refetch } = useGetOrderDetail(selectedOrderDetail.orderId, selectedOrderDetail.subscription);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['order', nextPage],
        queryFn: () => getOrders(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

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

  const handleRowClick = async (orderId, subscription) => {
    await setSelectedOrderDetail({ orderId, subscription });
    await refetch();
    setOpenOrderDetailModal(true);
  };

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    // TODO: 검색 API 호출
    console.log(`${category} : ${term}`);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <OrderTableFeature tableColumns={tableColumn.orders} onSearch={handleSearch} />

      {/* 테이블 */}
      <div className='px-4 shadow-md'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.orders} allChecked={selectedOrders.length === orderList?.length} setAllChecked={handleAllChecked} />
          <UnifiedOrderTableBody
            dataList={orderList}
            TableRowComponent={OrderTableRow}
            setOpenModal={handleRowClick}
            selectedOrders={selectedOrders}
            handleRowChecked={handleRowChecked}
          />
        </Table>
      </div>
      {/* 페이지네이션 */}
      <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
      {/* 모달 */}
      <OrderDetailModal
        isOpen={openOrderDetailModal}
        setOpenModal={setOpenOrderDetailModal}
        title='주문 상세'
        primaryButtonText={'확인'}
        selectedOrderDetail={selectedOrderDetail}
      />
    </div>
  );
};

export default OrderTable;
