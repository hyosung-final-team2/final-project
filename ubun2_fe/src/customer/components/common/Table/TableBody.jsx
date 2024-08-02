import { Table } from 'flowbite-react';


const TableBody = ({ dataList, TableRowComponent, dynamicId,setOpenModal, selectedMembers, handleRowChecked, isCheckable = true, handleDelete, noneSplitAddress, currentPage, PAGE_SIZE, colNum }) => {

  console.log(colNum)
  const paddedDataList = [...dataList];
  while (paddedDataList.length < PAGE_SIZE) {
    paddedDataList.push({
      [dynamicId]: `empty-${paddedDataList.length}`,
      isEmpty: true,
    });
  }

  return (
    <Table.Body className='divide-y'>
      {paddedDataList?.map(data => {
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
              isEmpty={data.isEmpty}
              colNum={colNum}
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
