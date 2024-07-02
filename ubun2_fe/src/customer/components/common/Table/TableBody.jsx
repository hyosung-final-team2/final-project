import { Table } from 'flowbite-react';

const TableBody = ({ users, TableRowComponent, setOpenModal, selectedMembers, handleRowChecked }) => {
  return (
    <Table.Body className='divide-y'>
      {users.map(member => {
        return (
          // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
          <TableRowComponent
            key={member.memberId}
            {...member}
            setOpenModal={setOpenModal}
            isChecked={selectedMembers.includes(member.memberId)}
            handleRowChecked={handleRowChecked}
          />
        );
      })}
    </Table.Body>
  );
};
export default TableBody;
