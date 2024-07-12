import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { memo } from 'react';

const MemberTableRow = ({ memberId, memberEmail, memberName, memberPhone, createdAt, pending, setOpenModal, isChecked, handleRowChecked, currentPage }) => {
  const parseDate = createdAt => {
    const date = new Date(createdAt);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(memberId, pending, currentPage)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(memberId, pending)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{memberEmail}</Table.Cell>
        <Table.Cell>{memberName}</Table.Cell>
        <Table.Cell>{memberPhone}</Table.Cell>
        <Table.Cell>{createdAt ? parseDate(createdAt) : null}</Table.Cell>
        <Table.Cell>
          {!pending ? (
            <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='완료' />
          ) : (
            <StatusBadge bgColor='bg-badge-yellow' txtColor='text-badge-yellow' badgeText='대기' />
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default memo(MemberTableRow);
