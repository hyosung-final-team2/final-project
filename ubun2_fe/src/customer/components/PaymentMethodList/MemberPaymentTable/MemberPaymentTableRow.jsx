import { Table } from 'flowbite-react';
const MemberPaymentTableRow = ({ type, company, number, expiry }) => {
  return (
    <>
      <Table.Row className='bg-white'>
        <Table.Cell>{type}</Table.Cell>
        <Table.Cell>{company}</Table.Cell>
        <Table.Cell>{number}</Table.Cell>
        <Table.Cell>{expiry}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberPaymentTableRow;
