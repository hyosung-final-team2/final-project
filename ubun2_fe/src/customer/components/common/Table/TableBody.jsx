import { Table } from 'flowbite-react';


const TableBody = ({ dataList, TableRowComponent, dynamicId,setOpenModal, selectedMembers, handleRowChecked, isCheckable = true, handleDelete, noneSplitAddress }) => {

  return (
    <Table.Body className='divide-y'>
      {dataList?.map(data => {
        const keyValue = data[dynamicId]
        return (
          // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
          isCheckable ? (
            <TableRowComponent
              key={keyValue}
              {...data}
              setOpenModal={setOpenModal}
              isChecked={selectedMembers.includes(keyValue)}
              handleRowChecked={handleRowChecked}
              currentPage={currentPage}
            />
          ) : (
            <TableRowComponent key={keyValue} {...data} setOpenModal={setOpenModal} handleDelete={handleDelete}/>
          )
        );
      })}
    </Table.Body>
  );
};
export default TableBody;
