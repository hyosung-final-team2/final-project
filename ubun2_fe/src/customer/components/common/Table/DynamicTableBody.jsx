import { Table } from 'flowbite-react';

const DynamicTableBody = ({ dataList, TableRowComponent, dynamicKey, dynamicId, setOpenModal, selectedMembers, handleRowChecked, isCheckable = true,currentPage }) => {
  return (
    <Table.Body className='divide-y'>
      {dataList?.map(data => {
        const keyValue = data[dynamicKey];
        const idValue = data[dynamicId];
        const pending = data.pending;
        return (
          // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
          isCheckable ? (
            <TableRowComponent
              key={keyValue}
              {...data}
              setOpenModal={setOpenModal}
              isChecked={selectedMembers.some(member => member.memberId === idValue && member.pending === pending)}
              handleRowChecked={() => handleRowChecked(idValue, pending, data.memberName, data.memberPhone)}
              currentPage={currentPage}
            />
          ) : (
            <TableRowComponent key={keyValue} {...data} setOpenModal={setOpenModal} />
          )
        );
      })}
    </Table.Body>
  );
};
export default DynamicTableBody;
