import { useState } from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import { customTableTheme } from '../../common/Table/tableStyle';
import { tableColumn } from '../../common/Table/tableIndex';
import OrderDetailModal from '../OrderDetailModal/OrderDetailModal';
import TablePagination from '../../common/Pagination/TablePagination';
import OrderTableRow from './OrderTableRow';
import OrderTableFeature from './OrderTableFeature';

const OrderTable = ({ orders }) => {
  const [openModal, setOpenModal] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState([]); // 체크된 멤버 ID
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleRowChecked = id => {
    setSelectedOrders(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
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
          <TableHead tableColumns={tableColumn.orders} allChecked={selectedOrders.length === orders.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={orders}
            TableRowComponent={OrderTableRow}
            selectedMembers={selectedOrders}
            setOpenModal={setOpenModal}
            handleRowChecked={handleRowChecked}
          />
        </Table>
      </div>
      {/* 페이지네이션 */}
      <TablePagination totalPages={3} containerStyle='bg-white py-4' />
      {/* 모달 */}
      <OrderDetailModal isOpen={openModal} setOpenModal={setOpenModal} title='주문 상세' />
    </div>
  );
};

export default OrderTable;
