import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';
import { formatDate } from '../../../utils/dateFormat';

const MemberTableRow = ({ memberId, memberEmail, memberName, memberPhone, createdAt, pending, setOpenModal, isChecked, handleRowChecked, currentPage }) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(memberId, pending, currentPage)}>
        <Table.Cell style={{width:"5%"}}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(memberId, pending, memberName, memberPhone)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell style={{width:"20%"}}>{memberEmail}</Table.Cell>
        <Table.Cell style={{width:"15%"}}>{memberName}</Table.Cell>
        <Table.Cell style={{width:"20%"}}>{memberPhone}</Table.Cell>
        <Table.Cell style={{width:"20%"}}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
        <Table.Cell style={{width:"20%"}}>{!pending ? <StatusBadge status={'COMPLETED'} /> : <StatusBadge status={'PENDING'} />}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default memo(MemberTableRow);
