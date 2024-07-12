import { Table } from 'flowbite-react';

const MemberAddressTableRow = ({ addressNum, addressFirst, addressSecond, addressThird }) => {
  return (
    <Table.Row className='bg-white'>
      <Table.Cell>{addressNum}</Table.Cell>
      <Table.Cell>{addressFirst}</Table.Cell>
      <Table.Cell>{addressSecond}</Table.Cell>
      <Table.Cell>{addressThird}</Table.Cell>
    </Table.Row>
  );
};
export default MemberAddressTableRow;
