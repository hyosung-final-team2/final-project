import { Table } from 'flowbite-react';

const MemberAddressTableRow = ({ addressNickname, addressTop, addressMid, addressBottom }) => {
  return (
    <Table.Row className='bg-white'>
      <Table.Cell>{addressNickname}</Table.Cell>
      <Table.Cell>{addressTop}</Table.Cell>
      <Table.Cell>{addressMid}</Table.Cell>
      <Table.Cell>{addressBottom}</Table.Cell>
    </Table.Row>
  );
};
export default MemberAddressTableRow;
