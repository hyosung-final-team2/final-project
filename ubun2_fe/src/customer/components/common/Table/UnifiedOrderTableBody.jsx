import { Table } from 'flowbite-react';

const UnifiedOrderTableBody = ({ dataList, TableRowComponent, setOpenModal, selectedOrders, handleRowChecked, isCheckable = true, currentPage, PAGE_SIZE, colNum }) => {
  console.log(dataList)

  const paddedDataList = [...dataList];
  while (paddedDataList.length < PAGE_SIZE) {
    paddedDataList.push({
      orderId: `empty-${paddedDataList.length}`,
      isEmpty: true,
    });
  }

  return (
    <Table.Body className='divide-y'>
      {paddedDataList?.map((data, index) => {
        const orderId = data.orderId;
        const subscription = data.subscription;
        const memberId = data.memberId;

        return isCheckable ? (
          <TableRowComponent
            key={index}
            {...data}
            setOpenModal={setOpenModal}
            isChecked={selectedOrders.some(order => order.orderId === orderId && order.subscription === subscription && order.memberId === memberId)}
            handleRowChecked={() => handleRowChecked(orderId, subscription, memberId)}
            currentPage={currentPage}
            isEmpty={data.isEmpty}
            colNum={colNum}
          />
        ) : (
          <TableRowComponent key={index} {...data} setOpenModal={setOpenModal} />
        );
      })}
    </Table.Body>
  );
};

export default UnifiedOrderTableBody;
