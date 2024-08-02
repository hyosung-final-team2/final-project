import { Table, Checkbox } from 'flowbite-react';
import useAddressTableStore from '../../store/Address/addressTableStore.js';

const AddressTableRow = ({ memberId, addressId, memberName, address, setOpenModal, isChecked, handleRowChecked, isEmpty, colNum }) => {
  const { sort } = useAddressTableStore();

  if (isEmpty) {
    return (
      <Table.Row className='cursor-default'>
        <Table.Cell colSpan={colNum + 1} className='text-center text-gray-500 bg-gray-50'>
          <span className='invisible'>없음</span>
        </Table.Cell>
      </Table.Row>
    );
  }
  const [zipNo, city, town, ...detail] = address.split(',');

  const getColorForColumn = column => {
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  const handleCheckboxChange = e => {
    e.stopPropagation();
    handleRowChecked(addressId, e.target.checked);
  };

  return (
    <>
      <Table.Row className='bg-white cursor-pointer h-[60px]' onClick={() => setOpenModal(addressId, memberId, address)}>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} onClick={e => e.stopPropagation()} />
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
