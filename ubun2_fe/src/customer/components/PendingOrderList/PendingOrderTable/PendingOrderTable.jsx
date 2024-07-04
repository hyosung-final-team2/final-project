import { useState } from 'react';
import { Table } from 'flowbite-react';
import { customTableTheme } from '../../common/Table/tableStyle';
import { tableColumn } from '../../common/Table/tableIndex';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import TablePagination from '../../common/Pagination/TablePagination';
import PendingOrderTableFeature from './PendingOrderTableFeature';
import PendingOrderTableRow from './PendingOrderTableRow';
import OrderDetailModal from '../../OrderList/OrderDetailModal/OrderDetailModal';

const PendingOrderTable = ({ pendingOrders }) => {
  const [openModal, setOpenModal] = useState(false);

  const [selectedPendingOrders, setSelectedPendingOrders] = useState([]); // 체크된 멤버 ID
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedPendingOrders(pendingOrders.map(pendingOrder => pendingOrder.id));
    } else {
      setSelectedPendingOrders([]);
    }
  };

  const handleRowChecked = id => {
    setSelectedPendingOrders(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
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
      <PendingOrderTableFeature tableColumns={tableColumn.pendingOrders} onSearch={handleSearch} />

      {/* 테이블 */}
      <div className='px-4 shadow-md'>
        <Table hoverable theme={customTableTheme}>
          <TableHead
            tableColumns={tableColumn.pendingOrders}
            allChecked={selectedPendingOrders.length === pendingOrders.length}
            setAllChecked={handleAllChecked}
          />
          <TableBody
            users={pendingOrders}
            TableRowComponent={PendingOrderTableRow}
            selectedMembers={selectedPendingOrders}
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

export default PendingOrderTable;
