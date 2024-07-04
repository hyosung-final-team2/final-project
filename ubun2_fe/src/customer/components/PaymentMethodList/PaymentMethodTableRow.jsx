import { Table, Checkbox } from 'flowbite-react';
const PaymentMethodTableRow = ({ name, email, method, bank, accountNumber, setOpenModal, isChecked, handleRowChecked }) => {
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Table.Row className='bg-white' onClick={handleClick}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{method}</Table.Cell>
        <Table.Cell>{bank}</Table.Cell>
        <Table.Cell>{accountNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default PaymentMethodTableRow;
