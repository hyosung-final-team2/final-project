import { useState } from 'react';
import { Table } from 'flowbite-react';
import { customTableTheme } from '../../common/Table/tableStyle';
import { tableColumn } from '../../common/Table/tableIndex';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import TablePagination from '../../common/Pagination/TablePagination';
import OrderDetailModal from '../../OrderList/OrderDetailModal/OrderDetailModal';
import Alert from '../../common/Alert/Alert';
import PendingOrderTableFeature from './PendingOrderTableFeature';
import PendingOrderTableRow from './PendingOrderTableRow';
import { CheckIcon } from '@heroicons/react/16/solid';

const PendingOrderTable = ({ pendingOrders }) => {
  const [openModal, setOpenModal] = useState(false);

  // 알림 모달
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    subMessage: '',
  });

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
    setSelectedPendingOrders(prev => (prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]));
  };

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    // TODO: 검색 API 호출
    console.log(`${category} : ${term}`);
  };

  const handleAlert = (message, subMessage) => {
    setAlertMessage({ message, subMessage });
    setShowAlert(true);
  };

  const orderApprove = (e, id) => {
    e.stopPropagation();
    // TODO: 회원의 주문 요청 승인 API
    handleAlert('승인처리 완료', '승인처리가 완료되었습니다.');
  };

  const orderCancel = (e, id) => {
    e.stopPropagation();
    // TODO: 회원의 주문 요청 취소(거절) API
    handleAlert('취소처리 완료', '취소처리가 완료되었습니다.');
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <PendingOrderTableFeature tableColumns={tableColumn.pendingOrders} onSearch={handleSearch} orderApprove={orderApprove} orderCancel={orderCancel} />

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
            TableRowComponent={props => <PendingOrderTableRow {...props} handleAlert={handleAlert} orderApprove={orderApprove} orderCancel={orderCancel} />}
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
      {/* 알림 */}
      <Alert show={showAlert} onClose={() => setShowAlert(false)} content={alertMessage} IconComponent={CheckIcon} />
    </div>
  );
};

export default PendingOrderTable;
