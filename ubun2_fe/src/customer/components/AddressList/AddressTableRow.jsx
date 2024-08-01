import { Table, Checkbox } from 'flowbite-react';
import useAddressTableStore from '../../store/Address/addressTableStore.js';

const AddressTableRow = ({ memberId, addressId, memberName, address, setOpenModal, isChecked, handleRowChecked }) => {
  const [zipNo, city, town, ...detail] = address.split(',');

  const { sort } = useAddressTableStore();

  const getColorForColumn = column => {
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  return (
    <>
      <Table.Row className='bg-white cursor-pointer' onClick={() => setOpenModal(addressId, memberId, address)}>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(addressId)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell className={getColorForColumn('memberName')} style={{ width: '15%' }}>
          {memberName}
        </Table.Cell>
        <Table.Cell className={getColorForColumn('address')} style={{ width: '15%' }}>
          {city}
        </Table.Cell>
        <Table.Cell className={getColorForColumn('address')} style={{ width: '15%' }}>
          {town}
        </Table.Cell>
        <Table.Cell className={getColorForColumn('address')} style={{ width: '35%' }}>
          {detail}
        </Table.Cell>
        <Table.Cell className={getColorForColumn('address')} style={{ width: '15%' }}>
          {zipNo}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default AddressTableRow;
