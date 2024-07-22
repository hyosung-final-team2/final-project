import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';
import { formatDate } from '../../../utils/dateFormat';

const MemberTableRow = ({ memberId, memberEmail, memberName, memberPhone, createdAt, pending, setOpenModal, isChecked, handleRowChecked, currentPage }) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(memberId, pending, currentPage)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(memberId, pending, memberName, memberPhone)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{memberEmail}</Table.Cell>
        <Table.Cell>{memberName}</Table.Cell>
        <Table.Cell>{memberPhone}</Table.Cell>
        <Table.Cell>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
        <Table.Cell>{!pending ? <StatusBadge status={'COMPLETED'} /> : <StatusBadge status={'PENDING'} />}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default memo(MemberTableRow);
