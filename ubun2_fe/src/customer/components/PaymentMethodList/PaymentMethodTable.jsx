import { useState } from 'react';
import { Table } from 'flowbite-react';
import MemberPaymentMethodModal from './MemberPaymentMethodModal';
import { tableColumn } from '../common/Table/tableIndex';
import TableHead from '../common/Table/TableHead';
import TableBody from '../common/Table/TableBody';
import TablePagination from '../common/Pagination/TablePagination';
import PaymentMethodTableFeature from './PaymentMethodTableFeature';
import PaymentMethodTableRow from './PaymentMethodTableRow';
import { customTableTheme } from '../common/Table/tableStyle';

const PaymentMethodTable = ({ payments }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [checkedMembers, setCheckedMembers] = useState([]);

  const handleAllChecked = checked => {
    if (checked) {
      setCheckedMembers(payments.map(payment => payment.id));
    } else {
      setCheckedMembers([]);
    }
  };

  const handleRowChecked = id => {
    setCheckedMembers(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <PaymentMethodTableFeature setOpenModal={setOpenModal} />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.paymentMethod.list} allChecked={checkedMembers.length === payments.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={payments}
            TableRowComponent={PaymentMethodTableRow}
            setOpenModal={setOpenModal}
            selectedMembers={checkedMembers}
            handleRowChecked={handleRowChecked}
          />
        </Table>
        <TablePagination totalPages={3} containerStyle='bg-white py-4' />
        <MemberPaymentMethodModal isOpen={openModal} setOpenModal={setOpenModal} member={selectedMember} />
      </div>
    </div>
  );
};

export default PaymentMethodTable;
