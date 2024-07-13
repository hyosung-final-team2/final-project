import { Table } from 'flowbite-react';

const UnifiedOrderTableBody = ({ dataList, TableRowComponent, setOpenModal, selectedOrders, handleRowChecked, isCheckable = true }) => {
  return (
    <Table.Body className='divide-y'>
      {dataList?.map((data, index) => {
        const orderId = data.orderId;
        const subscription = data.subscription;

        return isCheckable ? (
          <TableRowComponent
            key={index}
            {...data}
            setOpenModal={setOpenModal}
            isChecked={selectedOrders.some(order => order.orderId === orderId && order.subscription === subscription)}
            handleRowChecked={() => handleRowChecked(orderId, subscription)}
          />
        ) : (
          <TableRowComponent key={index} {...data} setOpenModal={setOpenModal} />
        );
      })}
    </Table.Body>
  );
};

export default UnifiedOrderTableBody;