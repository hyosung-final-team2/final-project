import { Table, Checkbox } from 'flowbite-react';

const AddressTableRow = ({ id, memberId, addressId, memberName, memberEmail, address, setOpenModal, isChecked, handleRowChecked }) => {
  const [zipNo, city, town, ...detail] = address.split(',');

  return (
    <>
      <Table.Row className='bg-white cursor-pointer' onClick={() => setOpenModal(addressId, memberId)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{memberName}</Table.Cell>
        <Table.Cell>{city}</Table.Cell>
        <Table.Cell>{town}</Table.Cell>
        <Table.Cell>{detail}</Table.Cell>
        <Table.Cell>{zipNo}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default AddressTableRow;
