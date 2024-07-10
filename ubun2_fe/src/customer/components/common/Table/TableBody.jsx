import { Table } from 'flowbite-react';

const TableBody = ({ users, TableRowComponent, setOpenModal, selectedMembers, handleRowChecked, isCheckable = true }) => {
  return (
    <Table.Body className='divide-y'>
      {users?.map(member => {
        return (
          // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
          isCheckable ? (
            <TableRowComponent
              key={member.id}
              {...member}
              setOpenModal={setOpenModal}
              isChecked={selectedMembers.includes(member.id)}
              handleRowChecked={handleRowChecked}
            />
          ) : (
            <TableRowComponent key={member.id} {...member} setOpenModal={setOpenModal} />
          )
        );
      })}
    </Table.Body>
  );
};
export default TableBody;
