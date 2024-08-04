import { Checkbox, Table } from 'flowbite-react';
import useAddressTableStore from '../../../store/Address/addressTableStore.js';

const SkeletonAddressTableRow = ({ memberName, address, isEmpty, colNum }) => {
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

  const getColorForColumn = column => {
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };

  if (!address) return;
  const [zipNo, city, town, ...detail] = address?.split(',');

  return (
    <>
      {/*<Table.Row className='skeleton' >*/}
      <Table.Row className='bg-white cursor-pointer h-[60px]'>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox />
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
export default SkeletonAddressTableRow;
