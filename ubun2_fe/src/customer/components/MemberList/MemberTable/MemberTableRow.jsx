import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';
import { formatDate } from '../../../utils/dateFormat';
import useMemberTableStore from "../../../store/MemberTable/memberTableStore.js";

const MemberTableRow = ({ memberId, memberEmail, memberName, memberPhone, createdAt, pending, setOpenModal, isChecked, handleRowChecked, currentPage, isEmpty }) => {


  const { sort } = useMemberTableStore();

  const getColorForColumn = (column) => {
    if (column === 'isPending') {
      return '';
    }
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  if (isEmpty) {
    return (
        <Table.Row className="cursor-default">
          <Table.Cell colSpan="6" className="text-center text-gray-500 bg-gray-50">
            <StatusBadge status={'EMPTY'} />
          </Table.Cell>
        </Table.Row>
    );
  }

  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(memberId, pending, currentPage)}>
        <Table.Cell style={{width:"5%"}}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(memberId, pending, memberName, memberPhone)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell className={getColorForColumn('memberEmail')} style={{ width: "20%" }}>{memberEmail}</Table.Cell>
        <Table.Cell className={getColorForColumn('memberName')} style={{ width: "15%" }}>{memberName}</Table.Cell>
        <Table.Cell className={getColorForColumn('memberPhone')} style={{ width: "20%" }}>{memberPhone}</Table.Cell>
        <Table.Cell className={getColorForColumn('createdAt')} style={{ width: "20%" }}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
        <Table.Cell style={{width:"20%"}}>{!pending ? <StatusBadge status={'COMPLETED'} /> : <StatusBadge status={'PENDING'} />}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default memo(MemberTableRow);
