import { Table } from 'flowbite-react';
import useAddressStore from '../../../store/Address/useAddressStore';
const MemberAddressTableRow = ({ addressNum, addressFirst, addressSecond, addressThird }) => {
  return (
    <>
      <Table.Row className='bg-white cursor-pointer'>
        <Table.Cell>{addressFirst}</Table.Cell>
        <Table.Cell>{addressSecond}</Table.Cell>
        <Table.Cell>{addressThird}</Table.Cell>
        <Table.Cell>{addressNum}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberAddressTableRow;
