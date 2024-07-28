import { Checkbox, Table } from 'flowbite-react';

const SkeletonAddressTableRow = ({ memberName, address }) => {
  if (!address) return;
  const [zipNo, city, town, ...detail] = address?.split(',');

  return (
    <>
      {/*<Table.Row className='skeleton' >*/}
      <Table.Row className='bg-white cursor-pointer'>
        <Table.Cell style={{ width: '5%' }}>
          <Checkbox />
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
export default SkeletonAddressTableRow;
