import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';

const MemberTableRow = ({
  memberId,
  memberEmail,
  memberName,
  memberPhone,
  memberRegisterDate,
  memberRegisterStatus,
  setOpenModal,
  isChecked,
  handleRowChecked,
}) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(true)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(memberId)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{memberEmail}</Table.Cell>
        <Table.Cell>{memberName}</Table.Cell>
        <Table.Cell>{memberPhone}</Table.Cell>
        <Table.Cell>{memberRegisterDate}</Table.Cell>
        <Table.Cell>
          {memberRegisterStatus ? (
            <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='완료' />
          ) : (
            <StatusBadge bgColor='bg-badge-yellow' txtColor='text-badge-yellow' badgeText='대기' />
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberTableRow;
