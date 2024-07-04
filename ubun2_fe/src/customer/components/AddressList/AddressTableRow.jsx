import { Table, Checkbox } from 'flowbite-react';
const AddressTableRow = ({ id, name, email, city, town, detail, setOpenModal, isChecked, handleRowChecked }) => {
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Table.Row className='bg-white cursor-pointer' onClick={handleClick}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{city}</Table.Cell>
        <Table.Cell>{town}</Table.Cell>
        <Table.Cell>{detail}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default AddressTableRow;
