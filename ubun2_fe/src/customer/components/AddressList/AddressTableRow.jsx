import { Table, Checkbox } from 'flowbite-react';

const AddressTableRow = ({ id, memberId, addressId, memberName, address, setOpenModal, isChecked, handleRowChecked }) => {
  const [zipNo, city, town, ...detail] = address.split(',');

  return (
    <>
      <Table.Row className='bg-white cursor-pointer' onClick={() => setOpenModal(addressId, memberId, address)}>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(id)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell style={{ width: '15%' }}>{memberName}</Table.Cell>
        <Table.Cell style={{ width: '15%' }}>{city}</Table.Cell>
        <Table.Cell style={{ width: '15%' }}>{town}</Table.Cell>
        <Table.Cell style={{ width: '35%' }}>{detail}</Table.Cell>
        <Table.Cell style={{ width: '15%' }}>{zipNo}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default AddressTableRow;
